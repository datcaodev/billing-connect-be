import { BaseService } from "../core/baseService.core";
import { siteProductRepository } from "../repositories/siteProduct.repository";
import { siteProductVariantRepository } from "../repositories/siteProductVariant.repository";
import { siteProductOptionPriceRepository } from "../repositories/siteProductOptionPrice.repository";
import { siteProductCategoryMappingRepository } from "../repositories/siteProductCategoryMapping.repository";
import { siteCategoryRepository } from "../repositories/siteCategory.repository";
import { exchangeRateRepository } from "../repositories/exchangeRate.repository";
import { copiesByBundleRepository } from "../repositories/copiesByBundle.repository";
import { discountRepository } from "../repositories/discount.repository";
import { ISiteProductRequest, ISearchVariantsByDiscountRequest } from "../schemas/siteProduct.schema";
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
            const { name, desc, image_url, category_guids, variants } = data;

            // 1. Kiểm tra sự tồn tại của các danh mục
            const categories = await siteCategoryRepository.findByGuids(category_guids);
            if (categories.length !== category_guids.length) {
                throw new ConflictError("Một hoặc nhiều danh mục không tồn tại");
            }

            // 2. Tạo slug cho sản phẩm từ tên
            const slug = this.generateSlug(name);

            // 3. Lưu thông tin cơ bản của sản phẩm
            const product = await siteProductRepository.createProduct({
                guid: uuidv4(),
                name,
                desc,
                image_url, // Sau này sẽ xử lý upload file và lưu link cloud ở đây
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
                // Lưu thông tin biến thể (liên kết site_product_id với product_sku của nhà cung cấp)
                await siteProductVariantRepository.upsertVariant({
                    site_product_id: product.id,
                    product_sku: variantData.product_sku,
                    name: renderPlanName(variantData.high_flow_size, variantData.plan_type) || variantData.name,
                    status: 'active',
                    is_delete: false,
                    name_original: variantData.name
                }, queryRunner);

                // Lưu bảng giá chi tiết cho từng số ngày/dung lượng của gói
                for (const optionData of variantData.options) {
                    // Lấy giá bán lẻ từ cấu hình gói (biz_copies_by_bundle)
                    const bundleCopy = await copiesByBundleRepository.getPriceBySkuAndCopies(variantData.product_sku, optionData.copies);

                    if (!bundleCopy) {
                        throw new ConflictError(`Không tìm thấy cấu hình giá cho SKU: ${variantData.product_sku} với ${optionData.copies} copies`);
                    }

                    // Kiểm tra và lấy discount_id từ discount_guid nếu có
                    let discountId: number | undefined = undefined;
                    if (optionData.discount_guid) {
                        const discount = await discountRepository.findByGuid(optionData.discount_guid);
                        if (!discount) {
                            throw new ConflictError(`Không tìm thấy mã giảm giá với GUID: ${optionData.discount_guid}`);
                        }
                        discountId = discount.id;
                    }

                    await siteProductOptionPriceRepository.upsertOptionPrice({
                        product_sku: variantData.product_sku,
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
    public async getOptionPricesBySku(sku: string) {
        return await this.handleWithTryCatch(async () => {
            const prices = await siteProductOptionPriceRepository.findBySku(sku);
            const rateData = await exchangeRateRepository.findData();
            const rate = rateData && rateData.rate ? new Decimal(rateData.rate) : new Decimal(1);

            const transformedPrices = prices.map(price => {
                const originalPrice = price.retail_price;
                const finalPrice = new Decimal(originalPrice || 0).mul(rate).toString();

                return {
                    ...price,
                    original_price: originalPrice,
                    final_price: finalPrice
                };
            });

            return plainToInstance(SiteProductOptionPriceDto, transformedPrices);
        });
    }

    /**
     * Lấy danh sách option prices theo discount_guid (nhóm theo variant)
     */
    public async getVariantsByDiscount(discount_guid: string) {
        return await this.handleWithTryCatch(async () => {
            const discount = await discountRepository.findByGuid(discount_guid);
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
                        original_price: originalPriceDec, // Giá sau khi quy đổi tỷ giá, chưa áp mã giảm giá
                        final_price: finalPriceDec        // Giá sau khi quy đổi tỷ giá VÀ ĐÃ được áp mã giảm giá
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
