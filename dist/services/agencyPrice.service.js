"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyPriceService = void 0;
const baseService_core_1 = require("../core/baseService.core");
const repositories_1 = require("../repositories");
const formula_enum_1 = require("../enums/formula.enum");
const decimal_js_1 = __importDefault(require("decimal.js"));
const NotFoundError_error_1 = require("../utils/errors/NotFoundError.error");
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const agencyPrice_dto_1 = require("../dto/agencyPrice.dto");
const class_transformer_1 = require("class-transformer");
class AgencyPriceService extends baseService_core_1.BaseService {
    async createAgencyPriceTable(data) {
        return await this.handleWithTransaction(async (queryRunner) => {
            var _a, _b;
            const { agencyGuid, packages, formula, amount = 0, remark } = data;
            // 1. Tìm đại lý
            const agency = await repositories_1.agencyRepository.findByGuid(agencyGuid);
            if (!agency) {
                throw new NotFoundError_error_1.NotFoundError("Không tìm thấy đại lý");
            }
            // Cập nhật công thức cho đại lý
            await repositories_1.agencyRepository.updateAgencyFormula(agency.id, { type: formula, value: amount }, remark, queryRunner);
            // 2. Xóa các bảng giá cũ của đại lý
            // Xóa chi tiết giá (copies) trước
            await repositories_1.copiesByBundleRepository.deleteByAgentId(agency.id, queryRunner);
            // Xóa gói (bundles) sau (có CASCADE nhưng xóa explicit cho chắc theo yêu cầu)
            await repositories_1.bundleByAgencyRepository.deleteByAgentId(agency.id, queryRunner);
            // Duyệt qua danh sách các gói (packages) được gửi lên
            for (const pkg of packages) {
                // 3. Lấy thông tin quốc gia/vùng từ bảng billion
                const productCountries = await repositories_1.billionProductRepository.getProductCountries(pkg.skuId);
                let countryMcc = null;
                let countryName = null;
                let areaName = null;
                if (productCountries.length > 0) {
                    areaName = ((_a = productCountries[0].country_details) === null || _a === void 0 ? void 0 : _a.continent) || null;
                    if (productCountries.length === 1) {
                        const countryInfo = productCountries[0];
                        countryMcc = countryInfo.country_mcc;
                        countryName = ((_b = countryInfo.country_details) === null || _b === void 0 ? void 0 : _b.name) || null;
                    }
                }
                // 2. Lưu hoặc Cập nhật bảng BizBundleByAgency (liên kết giữa đại lý và bundle)
                const bundleData = {
                    agent_id: agency.id,
                    product_sku: pkg.skuId,
                    type: pkg.type,
                    name: pkg.name,
                    high_flow_size: pkg.highFlowSize,
                    plan_type: pkg.planType,
                    country_mcc: countryMcc,
                    country_name: countryName,
                    area_name: areaName,
                    is_active: true
                };
                const bundle = await repositories_1.bundleByAgencyRepository.upsertBundle(bundleData, queryRunner);
                const activeCopies = [];
                // Duyệt qua từng cấu hình (copies) của gói đó
                for (const price of pkg.prices) {
                    const copiesVal = parseInt(price.copies);
                    activeCopies.push(copiesVal);
                    // 3. Tính toán giá cuối cùng (final_price)
                    // Quy tắc: Nếu công thức là RETAIL_PRICE thì lấy retailPrice làm gốc, các case khác lấy settlementPrice
                    let basePriceValue = price.settlementPrice;
                    if (formula === formula_enum_1.PriceAdjustType.RETAIL_PRICE) {
                        basePriceValue = price.retailPrice;
                    }
                    const basePrice = new decimal_js_1.default(basePriceValue);
                    let finalPrice = new decimal_js_1.default(basePriceValue);
                    // Áp dụng công thức tính toán dựa trên PriceAdjustType
                    switch (formula) {
                        case formula_enum_1.PriceAdjustType.INCREASE_PERCENT: // Tăng theo %
                            finalPrice = basePrice.plus(basePrice.mul(amount).div(100));
                            break;
                        case formula_enum_1.PriceAdjustType.DECREASE_PERCENT: // Giảm theo %
                            finalPrice = basePrice.minus(basePrice.mul(amount).div(100));
                            break;
                        case formula_enum_1.PriceAdjustType.INCREASE_FIXED: // Cộng thêm tiền cố định
                            finalPrice = basePrice.plus(amount);
                            break;
                        case formula_enum_1.PriceAdjustType.DECREASE_FIXED: // Trừ bớt tiền cố định
                            finalPrice = basePrice.minus(amount);
                            break;
                        case formula_enum_1.PriceAdjustType.RETAIL_PRICE: // Giữ nguyên giá bán lẻ
                            finalPrice = basePrice;
                            break;
                    }
                    // 4. Lưu hoặc Cập nhật bảng BizCopiesByBundle (chi tiết giá cho từng mức copies)
                    const copyData = {
                        bundle_id: bundle.id,
                        copies: copiesVal,
                        base_price: parseFloat(basePrice.toFixed(4)),
                        final_price: parseFloat(finalPrice.toFixed(4)),
                        // Lưu lại snapshot công thức để sau này đối soát hoặc hiển thị lại
                        formula_snapsot: {
                            formula: formula,
                            amount: amount,
                            original_retail_price: price.retailPrice,
                            original_settlement_price: price.settlementPrice
                        },
                        is_active: true
                    };
                    await repositories_1.copiesByBundleRepository.upsertCopy(copyData, queryRunner);
                }
            }
            return true;
        });
    }
    async getAgencyPackages(agencyGuid, query) {
        // 1. Tìm đại lý
        const agency = await repositories_1.agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError_error_1.NotFoundError("Không tìm thấy đại lý");
        }
        const { page, size, sortBy, productSku, name } = query;
        const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
        // 2. Lấy danh sách bundle của đại lý với filter và pagination
        const [bundles, total] = await repositories_1.bundleByAgencyRepository.findActiveBundlesByAgentId(agency.id, { productSku, name }, pagination);
        if (!bundles.length) {
            return (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: agencyPrice_dto_1.AgencyPackageDto,
                entities: [],
                skip: pagination.skip,
                take: pagination.take,
                total
            });
        }
        const bundleIds = bundles.map(b => b.id);
        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await repositories_1.copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);
        // 4. Map dữ liệu trả về giống với cấu trúc khi save, đảm bảo camelCase
        const packagesList = [];
        for (const bundle of bundles) {
            const pkg = {
                guid: bundle.guid,
                skuId: bundle.product_sku,
                type: bundle.type,
                name: bundle.name,
                highFlowSize: bundle.high_flow_size,
                planType: bundle.plan_type,
                prices: []
            };
            const bundleCopies = copies.filter(c => c.bundle_id === bundle.id);
            for (const copy of bundleCopies) {
                const originalSnapshot = copy.formula_snapsot || {};
                pkg.prices.push({
                    guid: copy.guid,
                    productSku: pkg.skuId,
                    copies: copy.copies.toString(),
                    retailPrice: originalSnapshot.original_retail_price || copy.base_price.toString(),
                    settlementPrice: originalSnapshot.original_settlement_price || copy.base_price.toString(),
                    finalPrice: copy.final_price.toString()
                });
            }
            packagesList.push(pkg);
        }
        return (0, basePagination_core_1.mapPaginatedData)({
            dtoClass: agencyPrice_dto_1.AgencyPackageDto,
            entities: packagesList,
            skip: pagination.skip,
            take: pagination.take,
            total
        });
    }
    async getAgencyPackagesAll(agencyGuid, query) {
        // 1. Tìm đại lý
        const agency = await repositories_1.agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError_error_1.NotFoundError("Không tìm thấy đại lý");
        }
        const { productSku, name } = query;
        // 2. Lấy danh sách bundle của đại lý với filter (không pagination)
        const [bundles] = await repositories_1.bundleByAgencyRepository.findActiveBundlesByAgentId(agency.id, { productSku, name });
        if (!bundles.length) {
            return (0, class_transformer_1.plainToInstance)(agencyPrice_dto_1.AgencyPackagesAllDto, {
                agency,
                packages: []
            });
        }
        const bundleIds = bundles.map(b => b.id);
        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await repositories_1.copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);
        // 4. Map dữ liệu trả về
        const packagesList = [];
        for (const bundle of bundles) {
            const pkg = {
                guid: bundle.guid,
                skuId: bundle.product_sku,
                type: bundle.type,
                name: bundle.name,
                highFlowSize: bundle.high_flow_size,
                planType: bundle.plan_type,
                prices: []
            };
            const bundleCopies = copies.filter(c => c.bundle_id === bundle.id);
            for (const copy of bundleCopies) {
                const originalSnapshot = copy.formula_snapsot || {};
                pkg.prices.push({
                    guid: copy.guid,
                    productSku: pkg.skuId,
                    copies: copy.copies.toString(),
                    retailPrice: originalSnapshot.original_retail_price || copy.base_price.toString(),
                    settlementPrice: originalSnapshot.original_settlement_price || copy.base_price.toString(),
                    finalPrice: copy.final_price.toString()
                });
            }
            packagesList.push(pkg);
        }
        return (0, class_transformer_1.plainToInstance)(agencyPrice_dto_1.AgencyPackagesAllDto, {
            agency,
            packages: packagesList
        });
    }
    async getAgencyPackagesFilter(agencyGuid, query) {
        // 1. Tìm đại lý
        const agency = await repositories_1.agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError_error_1.NotFoundError("Không tìm thấy đại lý");
        }
        const { page, size, sortBy, productSku, name, countryMcc, areaName } = query;
        const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
        // Đảm bảo countryMcc luôn là array nếu có giá trị (do zod transform không tự gán lại vào req.query)
        const countryMccArray = Array.isArray(countryMcc)
            ? countryMcc
            : (typeof countryMcc === "string" ? countryMcc.split(",").map((v) => v.trim()).filter((v) => v !== "") : undefined);
        // 2. Lấy danh sách bundle của đại lý với filter và pagination
        const [bundles, total] = await repositories_1.bundleByAgencyRepository.findActiveBundlesFiltered(agency.id, { productSku, name, countryMcc: countryMccArray, areaName }, pagination);
        if (!bundles.length) {
            return (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: agencyPrice_dto_1.AgencyPackageDto,
                entities: [],
                skip: pagination.skip,
                take: pagination.take,
                total
            });
        }
        const bundleIds = bundles.map(b => b.id);
        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await repositories_1.copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);
        // 4. Map dữ liệu trả về
        const packagesList = [];
        for (const bundle of bundles) {
            const pkg = {
                guid: bundle.guid,
                skuId: bundle.product_sku,
                type: bundle.type,
                name: bundle.name,
                highFlowSize: bundle.high_flow_size,
                planType: bundle.plan_type,
                countryMcc: bundle.country_mcc,
                areaName: bundle.area_name,
                countryName: bundle.country_name,
                prices: []
            };
            const bundleCopies = copies.filter(c => c.bundle_id === bundle.id);
            for (const copy of bundleCopies) {
                const originalSnapshot = copy.formula_snapsot || {};
                pkg.prices.push({
                    guid: copy.guid,
                    productSku: pkg.skuId,
                    copies: copy.copies.toString(),
                    retailPrice: originalSnapshot.original_retail_price || copy.base_price.toString(),
                    settlementPrice: originalSnapshot.original_settlement_price || copy.base_price.toString(),
                    finalPrice: copy.final_price.toString()
                });
            }
            packagesList.push(pkg);
        }
        return (0, basePagination_core_1.mapPaginatedData)({
            dtoClass: agencyPrice_dto_1.AgencyPackageDto,
            entities: packagesList,
            skip: pagination.skip,
            take: pagination.take,
            total
        });
    }
    async updatePackagePrice(data) {
        const { agencyGuid, copiesGuid, price } = data;
        // 1. Tìm đại lý
        const agency = await repositories_1.agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError_error_1.NotFoundError("Không tìm thấy đại lý");
        }
        // 2. Tìm copy và kiểm tra quyền sở hữu
        const copy = await repositories_1.copiesByBundleRepository.findByGuidWithAgency(copiesGuid);
        if (!copy) {
            throw new NotFoundError_error_1.NotFoundError("Không tìm thấy cấu hình giá");
        }
        if (copy.bundle.agency.guid !== agencyGuid) {
            throw new Error("Không có quyền cập nhật cấu hình giá này");
        }
        // 3. Cập nhật giá
        await repositories_1.copiesByBundleRepository.updateFinalPriceByGuid(copiesGuid, price);
        return true;
    }
}
exports.agencyPriceService = new AgencyPriceService();
//# sourceMappingURL=agencyPrice.service.js.map