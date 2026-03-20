import { BaseService } from "../core/baseService.core";
import { agencyRepository, billionProductRepository, bundleByAgencyRepository, copiesByBundleRepository } from "../repositories";
import { IAgencyPriceRequest, IGetAgencyPackagesQuery, IGetAgencyPackagesFilterQuery, IUpdateAgencyPackagePrice, IGetAgencyPackagesAllQuery } from "../schemas/agencyPrice.schema";
import { PriceAdjustType } from "../enums/formula.enum";
import Decimal from "decimal.js";
import { NotFoundError } from "../utils/errors/NotFoundError.error";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { AgencyPackageDto, AgencyPackagesAllDto } from "../dto/agencyPrice.dto";
import { plainToInstance } from "class-transformer";

class AgencyPriceService extends BaseService {
    public async createAgencyPriceTable(data: IAgencyPriceRequest) {
        return await this.handleWithTransaction(async (queryRunner) => {
            const { agencyGuid, packages, formula, amount = 0, remark } = data;

            // 1. Tìm đại lý
            const agency = await agencyRepository.findByGuid(agencyGuid);
            if (!agency) {
                throw new NotFoundError("Không tìm thấy đại lý");
            }

            // Cập nhật công thức cho đại lý
            await agencyRepository.updateAgencyFormula(agency.id, { type: formula, value: amount }, remark, queryRunner);

            // 2. Xóa các bảng giá cũ của đại lý
            // Xóa chi tiết giá (copies) trước
            await copiesByBundleRepository.deleteByAgentId(agency.id, queryRunner);
            // Xóa gói (bundles) sau (có CASCADE nhưng xóa explicit cho chắc theo yêu cầu)
            await bundleByAgencyRepository.deleteByAgentId(agency.id, queryRunner);

            // Duyệt qua danh sách các gói (packages) được gửi lên
            for (const pkg of packages) {
                // 3. Lấy thông tin quốc gia/vùng từ bảng billion
                const productCountries = await billionProductRepository.getProductCountries(pkg.skuId);
                let countryMcc = null;
                let countryName = null;
                let areaName = null;

                if (productCountries.length > 0) {
                    areaName = productCountries[0].country_details?.continent || null;

                    if (productCountries.length === 1) {
                        const countryInfo = productCountries[0];
                        countryMcc = countryInfo.country_mcc;
                        countryName = countryInfo.country_details?.name || null;
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

                const bundle = await bundleByAgencyRepository.upsertBundle(bundleData, queryRunner);

                const activeCopies: number[] = [];
                // Duyệt qua từng cấu hình (copies) của gói đó
                for (const price of pkg.prices) {
                    const copiesVal = parseInt(price.copies);
                    activeCopies.push(copiesVal);

                    // 3. Tính toán giá cuối cùng (final_price)
                    // Quy tắc: Nếu công thức là RETAIL_PRICE thì lấy retailPrice làm gốc, các case khác lấy settlementPrice
                    let basePriceValue = price.settlementPrice;
                    if (formula === PriceAdjustType.RETAIL_PRICE) {
                        basePriceValue = price.retailPrice;
                    }

                    const basePrice = new Decimal(basePriceValue);
                    let finalPrice = new Decimal(basePriceValue);

                    // Áp dụng công thức tính toán dựa trên PriceAdjustType
                    switch (formula) {
                        case PriceAdjustType.INCREASE_PERCENT: // Tăng theo %
                            finalPrice = basePrice.plus(basePrice.mul(amount).div(100));
                            break;
                        case PriceAdjustType.DECREASE_PERCENT: // Giảm theo %
                            finalPrice = basePrice.minus(basePrice.mul(amount).div(100));
                            break;
                        case PriceAdjustType.INCREASE_FIXED: // Cộng thêm tiền cố định
                            finalPrice = basePrice.plus(amount);
                            break;
                        case PriceAdjustType.DECREASE_FIXED: // Trừ bớt tiền cố định
                            finalPrice = basePrice.minus(amount);
                            break;
                        case PriceAdjustType.RETAIL_PRICE: // Giữ nguyên giá bán lẻ
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

                    await copiesByBundleRepository.upsertCopy(copyData, queryRunner);
                }
            }

            return true;
        });
    }

    public async getAgencyPackages(agencyGuid: string, query: IGetAgencyPackagesQuery) {
        // 1. Tìm đại lý
        const agency = await agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError("Không tìm thấy đại lý");
        }

        const { page, size, sortBy, productSku, name } = query;
        const pagination = getPagination({ page, size, sortBy });

        // 2. Lấy danh sách bundle của đại lý với filter và pagination
        const [bundles, total] = await bundleByAgencyRepository.findActiveBundlesByAgentId(agency.id, { productSku, name }, pagination);

        if (!bundles.length) {
            return mapPaginatedData({
                dtoClass: AgencyPackageDto,
                entities: [],
                skip: pagination.skip,
                take: pagination.take,
                total
            });
        }

        const bundleIds = bundles.map(b => b.id);

        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);

        // 4. Map dữ liệu trả về giống với cấu trúc khi save, đảm bảo camelCase
        const packagesList: any[] = [];

        for (const bundle of bundles) {
            const pkg = {
                guid: bundle.guid,
                skuId: bundle.product_sku,
                type: bundle.type,
                name: bundle.name,
                highFlowSize: bundle.high_flow_size,
                planType: bundle.plan_type,
                prices: [] as any[]
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

        return mapPaginatedData({
            dtoClass: AgencyPackageDto,
            entities: packagesList,
            skip: pagination.skip,
            take: pagination.take,
            total
        });
    }

    public async getAgencyPackagesAll(agencyGuid: string, query: IGetAgencyPackagesAllQuery) {
        // 1. Tìm đại lý
        const agency = await agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError("Không tìm thấy đại lý");
        }

        const { productSku, name } = query;

        // 2. Lấy danh sách bundle của đại lý với filter (không pagination)
        const [bundles] = await bundleByAgencyRepository.findActiveBundlesByAgentId(agency.id, { productSku, name });

        if (!bundles.length) {
            return plainToInstance(AgencyPackagesAllDto, {
                agency,
                packages: []
            });
        }

        const bundleIds = bundles.map(b => b.id);

        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);

        // 4. Map dữ liệu trả về
        const packagesList: any[] = [];

        for (const bundle of bundles) {
            const pkg = {
                guid: bundle.guid,
                skuId: bundle.product_sku,
                type: bundle.type,
                name: bundle.name,
                highFlowSize: bundle.high_flow_size,
                planType: bundle.plan_type,
                prices: [] as any[]
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

        return plainToInstance(AgencyPackagesAllDto, {
            agency,
            packages: packagesList
        });
    }

    public async getAgencyPackagesFilter(agencyGuid: string, query: IGetAgencyPackagesFilterQuery) {
        // 1. Tìm đại lý
        const agency = await agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError("Không tìm thấy đại lý");
        }

        const { page, size, sortBy, productSku, name, countryMcc, areaName } = query;
        const pagination = getPagination({ page, size, sortBy });

        // Đảm bảo countryMcc luôn là array nếu có giá trị (do zod transform không tự gán lại vào req.query)
        const countryMccArray = Array.isArray(countryMcc)
            ? countryMcc
            : (typeof (countryMcc as any) === "string" ? (countryMcc as any).split(",").map((v: any) => v.trim()).filter((v: any) => v !== "") : undefined);

        // 2. Lấy danh sách bundle của đại lý với filter và pagination
        const [bundles, total] = await bundleByAgencyRepository.findActiveBundlesFiltered(
            agency.id,
            { productSku, name, countryMcc: countryMccArray, areaName },
            pagination
        );

        if (!bundles.length) {
            return mapPaginatedData({
                dtoClass: AgencyPackageDto,
                entities: [],
                skip: pagination.skip,
                take: pagination.take,
                total
            });
        }

        const bundleIds = bundles.map(b => b.id);

        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);

        // 4. Map dữ liệu trả về
        const packagesList: any[] = [];

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
                prices: [] as any[]
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

        return mapPaginatedData({
            dtoClass: AgencyPackageDto,
            entities: packagesList,
            skip: pagination.skip,
            take: pagination.take,
            total
        });
    }

    public async updatePackagePrice(data: IUpdateAgencyPackagePrice) {
        const { agencyGuid, copiesGuid, price } = data;

        // 1. Tìm đại lý
        const agency = await agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError("Không tìm thấy đại lý");
        }

        // 2. Tìm copy và kiểm tra quyền sở hữu
        const copy = await copiesByBundleRepository.findByGuidWithAgency(copiesGuid);
        if (!copy) {
            throw new NotFoundError("Không tìm thấy cấu hình giá");
        }

        if (copy.bundle.agency.guid !== agencyGuid) {
            throw new Error("Không có quyền cập nhật cấu hình giá này");
        }

        // 3. Cập nhật giá
        await copiesByBundleRepository.updateFinalPriceByGuid(copiesGuid, price);

        return true;
    }
}

export const agencyPriceService = new AgencyPriceService();
