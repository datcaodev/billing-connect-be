import { BaseService } from "../core/baseService.core";
import { siteProductRepository } from "../repositories/siteProduct.repository";
import { siteProductVariantRepository } from "../repositories/siteProductVariant.repository";
import { siteProductOptionPriceRepository } from "../repositories/siteProductOptionPrice.repository";
import { siteProductCategoryMappingRepository } from "../repositories/siteProductCategoryMapping.repository";
import { siteCategoryRepository } from "../repositories/siteCategory.repository";
import { exchangeRateRepository } from "../repositories/exchangeRate.repository";
import { copiesByBundleRepository } from "../repositories/copiesByBundle.repository";
import { discountRepository } from "../repositories/discount.repository";
import { ISiteProductRequest, ISearchVariantsByDiscountRequest, IRemoveDiscountFromOptionsRequest } from "../schemas/siteProduct.schema";
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/errors/AppError.error";
import { ErrorCode } from "../enums/error.enum";
import { ConflictError } from "../utils/errors/ConflictError.error";
import { getPagination, renderPlanName } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { SiteProductPaginationDto, SiteProductOptionPriceDto, SiteProductVariantWithPriceDto } from "../dto/siteProduct.dto";
import { plainToInstance } from "class-transformer";
import { Decimal } from 'decimal.js';
import { NotFoundError } from "../utils/errors/NotFoundError.error";

class SiteProductService extends BaseService {
    /**
     * Tạo mới sản phẩm cho site cùng với các biến thể và bảng giá
     * @param data Dữ liệu sản phẩm từ request
     */
    public async createSiteProduct(data: ISiteProductRequest) {
        return await this.handleWithTransaction(async (queryRunner) => {
            const { name, desc, imageUrl, categoryGuids, variants } = data;

            // 1. Kiểm tra sự tồn tại của các danh mục
            const categories = await siteCategoryRepository.findByGuids(categoryGuids);
            if (categories.length !== categoryGuids.length) {
                throw new ConflictError("Một hoặc nhiều danh mục không tồn tại");
            }

            // 2. Tạo slug cho sản phẩm từ tên
            const slug = this.generateSlug(name);

            // 3. Lưu thông tin cơ bản của sản phẩm
            const product = await siteProductRepository.createProduct({
                guid: uuidv4(),
                name,
                desc,
                image_url: imageUrl, // Mapping camelCase to snake_case entity field
                type: 'esim', // Mặc định là esim
                status: 'active', // Trạng thái mặc định là active
                is_delete: false,
                slug
            }, queryRunner);

            // 4. Lưu ánh xạ sản phẩm với các danh mục (Khu vực/Quốc gia)
            for (const category of categories) {
                await siteProductCategoryMappingRepository.createMapping({
                    product_id: product.id,
                    category_id: category.id
                }, queryRunner);
            }

            // 5. Xử lý lưu các gói (Variants) và bảng giá chi tiết
            for (const variantData of variants) {
                // Lưu thông tin biến thể (liên kết site_product_id với productSku của nhà cung cấp)
                await siteProductVariantRepository.upsertVariant({
                    site_product_id: product.id,
                    product_sku: variantData.productSku,
                    name: renderPlanName(variantData.highFlowSize, variantData.planType) || variantData.name,
                    status: 'active',
                    is_delete: false,
                    name_original: variantData.name,
                    plan_type: variantData.planType
                }, queryRunner);

                // Lưu bảng giá chi tiết cho từng số ngày/dung lượng của gói
                for (const optionData of variantData.options) {
                    // Lấy giá bán lẻ từ cấu hình gói (biz_copies_by_bundle)
                    const bundleCopy = await copiesByBundleRepository.getPriceBySkuAndCopies(variantData.productSku, optionData.copies);

                    if (!bundleCopy) {
                        throw new ConflictError(`Không tìm thấy cấu hình giá cho SKU: ${variantData.productSku} với ${optionData.copies} copies`);
                    }

                    // Kiểm tra và lấy discount_id từ discountGuid nếu có
                    let discountId: number | undefined = undefined;
                    if (optionData.discountGuid) {
                        const discount = await discountRepository.findByGuid(optionData.discountGuid);
                        if (!discount) {
                            throw new ConflictError(`Không tìm thấy mã giảm giá với GUID: ${optionData.discountGuid}`);
                        }
                        discountId = discount.id;
                    }

                    await siteProductOptionPriceRepository.upsertOptionPrice({
                        site_product_id: product.id,
                        product_sku: variantData.productSku,
                        copies: optionData.copies,
                        retail_price: bundleCopy.final_price,
                        discount_id: discountId,
                        currency: 'CNY' // Mặc định là nhân dân tệ theo thiết kế entity
                    }, queryRunner);
                }
            }

            return product;
        });
    }

    /**
     * Lấy danh sách sản phẩm với phân trang
     */
    public async searchProducts(data: any) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = getPagination({ page, size, sortBy });
            const result = await siteProductRepository.searchProducts(data, pagination);

            const dataMappingDTO = mapPaginatedData({
                dtoClass: SiteProductPaginationDto,
                entities: result.result,
                skip: pagination.skip,
                take: pagination.take,
                total: result.total
            });

            return dataMappingDTO;
        });
    }


    /**
     * Lấy danh sách mức giá theo SKU
     */
    public async getOptionPricesBySku(sku: string, siteProductGuid?: string) {
        return await this.handleWithTryCatch(async () => {
            let productId: number | undefined = undefined;
            if (siteProductGuid) {
                const product = await siteProductRepository.findByGuid(siteProductGuid);
                if (product) {
                    productId = product.id;
                }
            }

            const prices = await siteProductOptionPriceRepository.findBySku(sku, productId);
            const rateData = await exchangeRateRepository.findData();
            const rate = rateData && rateData.rate ? new Decimal(rateData.rate) : new Decimal(1);

            const transformedPrices = prices.map(price => {
                const originalPrice = price.retail_price;
                const finalPrice = new Decimal(originalPrice || 0).mul(rate).toString();

                return {
                    ...price,
                    originalPrice,
                    finalPrice
                };
            });

            return plainToInstance(SiteProductOptionPriceDto, transformedPrices);
        });
    }

    /**
     * Lấy danh sách option prices theo discountGuid (nhóm theo variant)
     */
    public async getVariantsByDiscount(discountGuid: string) {
        return await this.handleWithTryCatch(async () => {
            const discount = await discountRepository.findByGuid(discountGuid);
            if (!discount) {
                throw new NotFoundError("Mã giảm giá không tồn tại hoặc đã bị xóa");
            }

            const rawData = await siteProductOptionPriceRepository.findVariantsByDiscount(discount.id);

            // Fetch current exchange rate
            const rateData = await exchangeRateRepository.findData();
            const rate = rateData && rateData.rate ? new Decimal(rateData.rate) : new Decimal(1);

            // Calculate final prices for options
            const transformedData = rawData.map(variant => {
                const optionsWithPrices = variant.options.map((opt: any) => {
                    // Bước 1: Lấy giá gốc (đang lưu là loại tiền tệ nhập ở CMS - ví dụ CNY) nhân với tỷ giá hiện tại ra VND
                    let originalPriceDec = new Decimal(opt.retail_price || 0).mul(rate);
                    // Biến finalPriceDec lưu giá cuối cùng sẽ trả về (khởi tạo bằng giá đã quy đổi)
                    let finalPriceDec = originalPriceDec;

                    // Bước 2: Kiểm tra loại mã giảm giá và tính toán số tiền được giảm
                    if (discount.type === 'PERCENTAGE') {
                        // Nếu là giảm theo phần trăm:
                        // Lấy giá trị % chia 100 (ví dụ 50.00% -> 0.5)
                        const discountPercent = new Decimal(discount.value).div(100);
                        // Lấy giá đã quy đổi nhân với (1 - 0.5) = 0.5 (tức là còn 50% giá trị)
                        finalPriceDec = finalPriceDec.mul(new Decimal(1).minus(discountPercent));
                    } else if (discount.type === 'FIXED') {
                        // Nếu là giảm một số tiền cố định:
                        // Trừ thẳng số tiền đó vào giá đã quy đổi
                        finalPriceDec = finalPriceDec.minus(discount.value);
                        // Nếu sau khi giảm mà giá bị âm (ví dụ: giá 10k giảm 20k), thì set giá trị cuối cùng về 0
                        if (finalPriceDec.isNegative()) {
                            finalPriceDec = new Decimal(0);
                        }
                    }

                    // Trả về dữ liệu gốc của option cộng thêm 2 trường giá mới
                    return {
                        ...opt,
                        originalPrice: originalPriceDec, // Giá sau khi quy đổi tỷ giá, chưa áp mã giảm giá
                        finalPrice: finalPriceDec        // Giá sau khi quy đổi tỷ giá VÀ ĐÃ được áp mã giảm giá
                    };
                });

                return {
                    ...variant,
                    options: optionsWithPrices
                };
            });

            return transformedData;
        });
    }

    /**
     * Bỏ giảm giá ra khỏi các copies được chỉ định
     * @param optionPriceGuids Danh sách GUID của các option prices cần gỡ bỏ giảm giá
     */
    public async removeDiscountFromOptions(optionPriceGuids: string[]) {
        return await this.handleWithTryCatch(async () => {
            // Xóa discount_id khỏi các option prices được chỉ định theo GUID
            await siteProductOptionPriceRepository.removeDiscountFromSpecificGuids(optionPriceGuids);
            return true;
        });
    }

    /**
     * Lấy danh sách variants và options (giá) của sản phẩm theo GUID
     * @param guid GUID của sản phẩm site
     */
    public async getVariantsAndOptionsByProductGuid(guid: string) {
        return await this.handleWithTryCatch(async () => {
            const product = await siteProductRepository.findByGuid(guid);
            if (!product) {
                throw new NotFoundError("Sản phẩm không tồn tại hoặc đã bị xóa");
            }

            const rawData = await siteProductVariantRepository.getVariantsAndOptionsByProductId(product.id);
            if (!rawData || rawData.length === 0) {
                return [];
            }

            // Nhóm data theo variant (product_sku)
            const variantMap = new Map<string, any>();

            for (const item of rawData) {
                const sku = item.product_sku;
                if (!variantMap.has(sku)) {
                    variantMap.set(sku, {
                        guid: item.guid,
                        product_sku: sku,
                        name: item.name,
                        name_original: item.name_original,
                        plan_type: item.plan_type,
                        options: []
                    });
                }

                if (item.guid) { // Nếu có option price (do dùng left join)
                    variantMap.get(sku).options.push({
                        guid: item.guid,
                        copies: item.copies,
                        retail_price: item.retail_price,
                        currency: item.currency,
                        discount: item.discount_id ? {
                            id: item.discount_id,
                            guid: item.discount_guid,
                            name: item.discount_name,
                            type: item.discount_type,
                            value: item.discount_value
                        } : null
                    });
                }
            }

            const result = Array.from(variantMap.values());
            return plainToInstance(SiteProductVariantWithPriceDto, result);
            // return result
        });
    }

    /**
     * Xóa mềm sản phẩm (soft delete)
     * @param guid GUID của sản phẩm cần xóa
     */
    public async deleteSiteProduct(guid: string) {
        return await this.handleWithTransaction(async (queryRunner) => {
            // 1. Kiểm tra sản phẩm có tồn tại không
            const product = await siteProductRepository.findByGuid(guid);
            if (!product) {
                throw new NotFoundError("Sản phẩm không tồn tại hoặc đã bị xóa");
            }

            // 2. Xóa mềm sản phẩm
            await siteProductRepository.softDeleteByGuid(guid, queryRunner);

            // 3. Xóa mềm các biến thể của sản phẩm
            await siteProductVariantRepository.softDeleteByProductId(product.id, queryRunner);

            // 4. Xóa mềm các option prices tương ứng theo Product ID
            await siteProductOptionPriceRepository.softDeleteByProductId(product.id, queryRunner);

            return true;
        });
    }

    /**
     * Chuyển đổi tên tiếng Việt thành slug (không dấu, gạch ngang)
     */
    private generateSlug(text: string): string {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .replace(/([^0-9a-z-\s])/g, "")
            .replace(/(\s+)/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
}

export const siteProductService = new SiteProductService();
