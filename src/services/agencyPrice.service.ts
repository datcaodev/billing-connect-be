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
        /**
         * Luồng xử lý đồng bộ bảng giá đại lý (Bulk Sync):
         * 1. Tìm đại lý và cập nhật công thức tính giá.
         * 2. Xóa dữ liệu cũ (bundles & copies) trong transaction.
         * 3. Chuẩn bị dữ liệu: Lấy mapping quốc gia/vùng hàng loạt (Batch Mapping).
         * 4. Bulk Insert Bundles: Chèn hàng loạt lứa bundle mới và lấy về IDs kèm SKU.
         * 5. Tính toán giá cuối (Final Price) dựa trên công thức và settlement/retail price.
         * 6. Bulk Insert Copies: Chèn hàng loạt chi tiết giá (chia nhỏ chunk 1000 bản ghi).
         */
        return await this.handleWithTransaction(async (queryRunner) => {
            const { agencyGuid, packages: inputPackages, formula, amount = 0, remark, all } = data;

            let packagesToProcess = inputPackages || [];

            // 1. Xác định dữ liệu nguồn: Đồng bộ 'Tất cả' hoặc theo 'Danh sách packages' truyền lên
            if (all) {
                // Fetch toàn bộ sản phẩm và giá gốc từ nguồn Billion Connect
                const allProducts = await billionProductRepository.getAllProductsWithPrices();
                packagesToProcess = allProducts.map((p: any) => ({
                    skuId: p.sku_id,
                    type: p.type,
                    name: p.name,
                    highFlowSize: p.high_flow_size,
                    planType: p.plan_type,
                    prices: p.prices.map((pr: any) => ({
                        productSku: pr.product_sku,
                        copies: pr.copies,
                        retailPrice: pr.retail_price,
                        settlementPrice: pr.settlement_price
                    }))
                }));
            }

            // 2. Kiểm tra đại lý & Cập nhật chiến lược giá (Formula)
            const agency = await agencyRepository.findByGuid(agencyGuid);
            if (!agency) {
                throw new NotFoundError("Không tìm thấy đại lý");
            }

            // Lưu lại công thức tổng quát mà đại lý đang áp dụng
            await agencyRepository.updateAgencyFormula(agency.id, { type: formula, value: amount }, remark, queryRunner);

            // 2. Xóa các bảng giá cũ của đại lý
            // Xóa chi tiết giá (copies) trước
            await copiesByBundleRepository.deleteByAgentId(agency.id, queryRunner);
            // Xóa gói (bundles) sau (có CASCADE nhưng xóa explicit cho chắc theo yêu cầu)
            await bundleByAgencyRepository.deleteByAgentId(agency.id, queryRunner);

            // 3. Chuẩn bị dữ liệu Bulk Insert
            const allCountryMappings = await billionProductRepository.getAllProductCountriesMapped();
            const bundleValues: any[] = [];
            const packagePriceMap = new Map<string, any[]>();

            for (const pkg of packagesToProcess) {
                const productCountries = allCountryMappings.get(pkg.skuId) || [];
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

                bundleValues.push({
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
                });

                packagePriceMap.set(pkg.skuId, pkg.prices);
            }

            if (bundleValues.length === 0) return true;

            // 4. Bulk Insert Bundles và lấy IDs (Kèm SKU để map)
            const insertedBundles = await bundleByAgencyRepository.bulkInsert(bundleValues, queryRunner);

            // 5. Chuẩn bị dữ liệu Price Copies
            const copyValues: any[] = [];
            for (const bundle of insertedBundles) {
                const prices = packagePriceMap.get(bundle.product_sku) || [];

                for (const price of prices) {
                    const copiesVal = parseInt(price.copies);
                    let basePriceValue = price.settlementPrice;
                    if (formula === PriceAdjustType.RETAIL_PRICE) {
                        basePriceValue = price.retailPrice;
                    }

                    const basePrice = new Decimal(basePriceValue);
                    let finalPrice = new Decimal(basePriceValue);

                    switch (formula) {
                        case PriceAdjustType.INCREASE_PERCENT:
                            finalPrice = basePrice.plus(basePrice.mul(amount).div(100));
                            break;
                        case PriceAdjustType.DECREASE_PERCENT:
                            finalPrice = basePrice.minus(basePrice.mul(amount).div(100));
                            break;
                        case PriceAdjustType.INCREASE_FIXED:
                            finalPrice = basePrice.plus(amount);
                            break;
                        case PriceAdjustType.DECREASE_FIXED:
                            finalPrice = basePrice.minus(amount);
                            break;
                        case PriceAdjustType.RETAIL_PRICE:
                            finalPrice = basePrice;
                            break;
                    }

                    copyValues.push({
                        bundle_id: bundle.id,
                        copies: copiesVal,
                        base_price: parseFloat(basePrice.toFixed(4)),
                        final_price: parseFloat(finalPrice.toFixed(4)),
                        formula_snapsot: {
                            formula: formula,
                            amount: amount,
                            original_retail_price: price.retailPrice,
                            original_settlement_price: price.settlementPrice
                        },
                        is_active: true
                    });
                }
            }

            // 6. Bulk Insert Copies
            if (copyValues.length > 0) {
                // Chunk size to prevent too large query
                const chunkSize = 1000;
                for (let i = 0; i < copyValues.length; i += chunkSize) {
                    await copiesByBundleRepository.bulkInsert(copyValues.slice(i, i + chunkSize), queryRunner);
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
