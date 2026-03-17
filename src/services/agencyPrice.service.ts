import { BaseService } from "../core/baseService.core";
import { agencyRepository, bundleByAgencyRepository, copiesByBundleRepository } from "../repositories";
import { IAgencyPriceRequest } from "../schemas/agencyPrice.schema";
import { PriceAdjustType } from "../enums/formula.enum";
import Decimal from "decimal.js";
import { AppError } from "../utils/errors/AppError.error";
import { NotFoundError } from "../utils/errors/NotFoundError.error";
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

            // Duyệt qua danh sách các gói (packages) được gửi lên
            for (const pkg of packages) {
                // 2. Lưu hoặc Cập nhật bảng BizBundleByAgency (liên kết giữa đại lý và bundle)
                const bundleData = {
                    agent_id: agency.id,
                    product_sku: pkg.sku_id,
                    type: pkg.type,
                    name: pkg.name,
                    high_flow_size: pkg.high_flow_size,
                    plan_type: pkg.plan_type,
                    is_active: true
                };

                const bundle = await bundleByAgencyRepository.upsertBundle(bundleData, queryRunner);

                const activeCopies: number[] = [];
                // Duyệt qua từng cấu hình (copies) của gói đó
                for (const price of pkg.prices) {
                    const copiesVal = parseInt(price.copies);
                    activeCopies.push(copiesVal);

                    // 3. Tính toán giá cuối cùng (final_price)
                    // Quy tắc: Nếu công thức là RETAIL_PRICE thì lấy retail_price làm gốc, các case khác lấy settlement_price
                    let basePriceStr = price.settlement_price;
                    if (formula === PriceAdjustType.RETAIL_PRICE) {
                        basePriceStr = price.retail_price;
                    }

                    const basePrice = new Decimal(basePriceStr);
                    let finalPrice = new Decimal(basePriceStr);

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
                            original_retail_price: price.retail_price,
                            original_settlement_price: price.settlement_price
                        },
                        is_active: true
                    };

                    await copiesByBundleRepository.upsertCopy(copyData, queryRunner);
                }
            }

            return true;
        });
    }

    public async getAgencyPackages(agencyGuid: string) {
        // 1. Tìm đại lý
        const agency = await agencyRepository.findByGuid(agencyGuid);
        if (!agency) {
            throw new NotFoundError("Không tìm thấy đại lý");
        }

        // 2. Lấy danh sách bundle của đại lý
        const bundles = await bundleByAgencyRepository.findActiveBundlesByAgentId(agency.id);

        if (!bundles.length) {
            return {
                formula: agency.formula?.type || "",
                amount: agency.formula?.value || 0,
                remark: agency.formula_note || "",
                packages: []
            };
        }

        const bundleIds = bundles.map(b => b.id);

        // 3. Lấy thông tin copies/prices của các bundle đó
        const copies = await copiesByBundleRepository.findActiveCopiesByBundleIds(bundleIds);

        // 4. Map dữ liệu trả về giống với cấu trúc khi save
        const packagesMap = new Map<number, any>();

        for (const bundle of bundles) {
            packagesMap.set(bundle.id, {
                sku_id: bundle.product_sku,
                type: bundle.type,
                name: bundle.name,
                high_flow_size: bundle.high_flow_size,
                plan_type: bundle.plan_type,
                prices: []
            });
        }

        for (const copy of copies) {
            const pkg = packagesMap.get(copy.bundle_id);
            if (pkg) {
                const originalSnapshot = copy.formula_snapsot || {};
                pkg.prices.push({
                    product_sku: pkg.sku_id,
                    copies: copy.copies.toString(),
                    retail_price: originalSnapshot.original_retail_price || copy.base_price.toString(),
                    settlement_price: originalSnapshot.original_settlement_price || copy.base_price.toString(),
                    final_price: copy.final_price.toString()
                });
            }
        }

        return Array.from(packagesMap.values());
    }
}

export const agencyPriceService = new AgencyPriceService();
