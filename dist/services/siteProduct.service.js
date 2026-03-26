"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteProductService = void 0;
const baseService_core_1 = require("../core/baseService.core");
const siteProduct_repository_1 = require("../repositories/siteProduct.repository");
const siteProductVariant_repository_1 = require("../repositories/siteProductVariant.repository");
const siteProductOptionPrice_repository_1 = require("../repositories/siteProductOptionPrice.repository");
const siteProductCategoryMapping_repository_1 = require("../repositories/siteProductCategoryMapping.repository");
const siteCategory_repository_1 = require("../repositories/siteCategory.repository");
const exchangeRate_repository_1 = require("../repositories/exchangeRate.repository");
const copiesByBundle_repository_1 = require("../repositories/copiesByBundle.repository");
const discount_repository_1 = require("../repositories/discount.repository");
const uuid_1 = require("uuid");
const ConflictError_error_1 = require("../utils/errors/ConflictError.error");
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const siteProduct_dto_1 = require("../dto/siteProduct.dto");
const class_transformer_1 = require("class-transformer");
const decimal_js_1 = require("decimal.js");
const NotFoundError_error_1 = require("../utils/errors/NotFoundError.error");
class SiteProductService extends baseService_core_1.BaseService {
    /**
     * Tạo mới sản phẩm cho site cùng với các biến thể và bảng giá
     * @param data Dữ liệu sản phẩm từ request
     */
    async createSiteProduct(data) {
        return await this.handleWithTransaction(async (queryRunner) => {
            const { name, desc, imageUrl, categoryGuids, variants } = data;
            // 1. Kiểm tra sự tồn tại của các danh mục
            const categories = await siteCategory_repository_1.siteCategoryRepository.findByGuids(categoryGuids);
            if (categories.length !== categoryGuids.length) {
                throw new ConflictError_error_1.ConflictError("Một hoặc nhiều danh mục không tồn tại");
            }
            // 2. Tạo slug cho sản phẩm từ tên
            const slug = this.generateSlug(name);
            // 3. Lưu thông tin cơ bản của sản phẩm
            const product = await siteProduct_repository_1.siteProductRepository.createProduct({
                guid: (0, uuid_1.v4)(),
                name,
                desc,
                image_url: imageUrl, // Mapping camelCase to snake_case entity field
                type: 'esim', // Mặc định là esim
                status: 'active', // Trạng thái mặc định là active
                is_deleted: false,
                slug
            }, queryRunner);
            // 4. Lưu ánh xạ sản phẩm với các danh mục (Khu vực/Quốc gia)
            for (const category of categories) {
                await siteProductCategoryMapping_repository_1.siteProductCategoryMappingRepository.createMapping({
                    product_id: product.id,
                    category_id: category.id
                }, queryRunner);
            }
            // 5. Xử lý lưu các gói (Variants) và bảng giá chi tiết
            for (const variantData of variants) {
                // Lưu thông tin biến thể (liên kết site_product_id với productSku của nhà cung cấp)
                await siteProductVariant_repository_1.siteProductVariantRepository.upsertVariant({
                    site_product_id: product.id,
                    product_sku: variantData.productSku,
                    name: (0, utils_1.renderPlanName)(variantData.highFlowSize, variantData.planType) || variantData.name,
                    status: 'active',
                    is_deleted: false,
                    name_original: variantData.name,
                    plan_type: variantData.planType
                }, queryRunner);
                // Lưu bảng giá chi tiết cho từng số ngày/dung lượng của gói
                for (const optionData of variantData.options) {
                    // Lấy giá bán lẻ từ cấu hình gói (biz_copies_by_bundle)
                    const bundleCopy = await copiesByBundle_repository_1.copiesByBundleRepository.getPriceBySkuAndCopies(variantData.productSku, optionData.copies);
                    if (!bundleCopy) {
                        throw new ConflictError_error_1.ConflictError(`Không tìm thấy cấu hình giá cho SKU: ${variantData.productSku} với ${optionData.copies} copies`);
                    }
                    // Kiểm tra và lấy discount_id từ discountGuid nếu có
                    let discountId = undefined;
                    if (optionData.discountGuid) {
                        const discount = await discount_repository_1.discountRepository.findByGuid(optionData.discountGuid);
                        if (!discount) {
                            throw new ConflictError_error_1.ConflictError(`Không tìm thấy mã giảm giá với GUID: ${optionData.discountGuid}`);
                        }
                        discountId = discount.id;
                    }
                    await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.upsertOptionPrice({
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
    async searchProducts(data) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
            const result = await siteProduct_repository_1.siteProductRepository.searchProducts(data, pagination);
            const dataMappingDTO = (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: siteProduct_dto_1.SiteProductPaginationDto,
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
    async getOptionPricesBySku(sku, siteProductGuid) {
        return await this.handleWithTryCatch(async () => {
            let productId = undefined;
            if (siteProductGuid) {
                const product = await siteProduct_repository_1.siteProductRepository.findByGuid(siteProductGuid);
                if (product) {
                    productId = product.id;
                }
            }
            const prices = await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.findBySku(sku, productId);
            const rateData = await exchangeRate_repository_1.exchangeRateRepository.findData();
            const rate = rateData && rateData.rate ? new decimal_js_1.Decimal(rateData.rate) : new decimal_js_1.Decimal(1);
            const transformedPrices = prices.map(price => {
                const originalPrice = price.retail_price;
                const finalPrice = new decimal_js_1.Decimal(originalPrice || 0).mul(rate).toString();
                return Object.assign(Object.assign({}, price), { originalPrice,
                    finalPrice });
            });
            return (0, class_transformer_1.plainToInstance)(siteProduct_dto_1.SiteProductOptionPriceDto, transformedPrices);
        });
    }
    /**
     * Lấy danh sách option prices theo discountGuid (nhóm theo variant)
     */
    async getVariantsByDiscount(discountGuid) {
        return await this.handleWithTryCatch(async () => {
            const discount = await discount_repository_1.discountRepository.findByGuid(discountGuid);
            if (!discount) {
                throw new NotFoundError_error_1.NotFoundError("Mã giảm giá không tồn tại hoặc đã bị xóa");
            }
            const rawData = await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.findVariantsByDiscount(discount.id);
            // Fetch current exchange rate
            const rateData = await exchangeRate_repository_1.exchangeRateRepository.findData();
            const rate = rateData && rateData.rate ? new decimal_js_1.Decimal(rateData.rate) : new decimal_js_1.Decimal(1);
            // Calculate final prices for options
            const transformedData = rawData.map(variant => {
                const optionsWithPrices = variant.options.map((opt) => {
                    // Bước 1: Lấy giá gốc (đang lưu là loại tiền tệ nhập ở CMS - ví dụ CNY) nhân với tỷ giá hiện tại ra VND
                    let originalPriceDec = new decimal_js_1.Decimal(opt.retail_price || 0).mul(rate);
                    // Biến finalPriceDec lưu giá cuối cùng sẽ trả về (khởi tạo bằng giá đã quy đổi)
                    let finalPriceDec = originalPriceDec;
                    // Bước 2: Kiểm tra loại mã giảm giá và tính toán số tiền được giảm
                    if (discount.type === 'PERCENTAGE') {
                        // Nếu là giảm theo phần trăm:
                        // Lấy giá trị % chia 100 (ví dụ 50.00% -> 0.5)
                        const discountPercent = new decimal_js_1.Decimal(discount.value).div(100);
                        // Lấy giá đã quy đổi nhân với (1 - 0.5) = 0.5 (tức là còn 50% giá trị)
                        finalPriceDec = finalPriceDec.mul(new decimal_js_1.Decimal(1).minus(discountPercent));
                    }
                    else if (discount.type === 'FIXED') {
                        // Nếu là giảm một số tiền cố định:
                        // Trừ thẳng số tiền đó vào giá đã quy đổi
                        finalPriceDec = finalPriceDec.minus(discount.value);
                        // Nếu sau khi giảm mà giá bị âm (ví dụ: giá 10k giảm 20k), thì set giá trị cuối cùng về 0
                        if (finalPriceDec.isNegative()) {
                            finalPriceDec = new decimal_js_1.Decimal(0);
                        }
                    }
                    // Trả về dữ liệu gốc của option cộng thêm 2 trường giá mới
                    return Object.assign(Object.assign({}, opt), { originalPrice: originalPriceDec, finalPrice: finalPriceDec // Giá sau khi quy đổi tỷ giá VÀ ĐÃ được áp mã giảm giá
                     });
                });
                return Object.assign(Object.assign({}, variant), { options: optionsWithPrices });
            });
            return transformedData;
        });
    }
    /**
     * Bỏ giảm giá ra khỏi các copies được chỉ định
     * @param optionPriceGuids Danh sách GUID của các option prices cần gỡ bỏ giảm giá
     */
    async removeDiscountFromOptions(optionPriceGuids) {
        return await this.handleWithTryCatch(async () => {
            // Xóa discount_id khỏi các option prices được chỉ định theo GUID
            await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.removeDiscountFromSpecificGuids(optionPriceGuids);
            return true;
        });
    }
    /**
     * Lấy danh sách variants và options (giá) của sản phẩm theo GUID
     * @param guid GUID của sản phẩm site
     */
    async getVariantsAndOptionsByProductGuid(guid) {
        return await this.handleWithTryCatch(async () => {
            const product = await siteProduct_repository_1.siteProductRepository.findByGuid(guid);
            if (!product) {
                throw new NotFoundError_error_1.NotFoundError("Sản phẩm không tồn tại hoặc đã bị xóa");
            }
            const rawData = await siteProductVariant_repository_1.siteProductVariantRepository.getVariantsAndOptionsByProductId(product.id);
            if (!rawData || rawData.length === 0) {
                return [];
            }
            // Nhóm data theo variant (product_sku)
            const variantMap = new Map();
            for (const item of rawData) {
                const sku = item.product_sku;
                if (!variantMap.has(sku)) {
                    variantMap.set(sku, {
                        guid: item.variant_guid,
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
            return (0, class_transformer_1.plainToInstance)(siteProduct_dto_1.SiteProductVariantWithPriceDto, result);
            // return result
        });
    }
    /**
     * Cập nhật thông tin sản phẩm và đồng bộ hóa các gói (variants) và tùy chọn (options)
     * @param productGuid GUID của sản phẩm cần cập nhật
     * @param data Dữ liệu cập nhật
     */
    async updateSiteProduct(productGuid, data) {
        return await this.handleWithTransaction(async (queryRunner) => {
            // 1. Kiểm tra sản phẩm
            const product = await siteProduct_repository_1.siteProductRepository.findByGuid(productGuid);
            if (!product) {
                throw new NotFoundError_error_1.NotFoundError("Sản phẩm không tồn tại hoặc đã bị xóa");
            }
            // 2. Cập nhật thông tin cơ bản của sản phẩm
            const updateFields = {};
            if (data.name) {
                updateFields.name = data.name;
                updateFields.slug = this.generateSlug(data.name);
            }
            if (data.desc !== undefined)
                updateFields.desc = data.desc;
            if (data.imageUrl !== undefined)
                updateFields.image_url = data.imageUrl;
            if (Object.keys(updateFields).length > 0) {
                await siteProduct_repository_1.siteProductRepository.updateByGuid(productGuid, updateFields, queryRunner);
            }
            // 3. Đồng bộ hóa Variants và Options (Xóa hết insert lại - Xóa cứng)
            if (data.variants) {
                // Xóa cứng tất cả variants hiện tại của sản phẩm
                await siteProductVariant_repository_1.siteProductVariantRepository.hardDeleteByProductId(product.id, queryRunner);
                // Xóa cứng tất cả option prices hiện tại của sản phẩm
                await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.hardDeleteByProductId(product.id, queryRunner);
                // Insert lại từ đầu các variant và option trong request
                for (const variantData of data.variants) {
                    await siteProductVariant_repository_1.siteProductVariantRepository.upsertVariant({
                        site_product_id: product.id,
                        product_sku: variantData.productSku,
                        name: (0, utils_1.renderPlanName)(variantData.highFlowSize, variantData.planType) || variantData.name,
                        status: 'active',
                        is_deleted: false, // Reactivate
                        name_original: variantData.name,
                        plan_type: variantData.planType
                    }, queryRunner);
                    if (variantData.options) {
                        for (const optionData of variantData.options) {
                            let discountId = null;
                            if (optionData.discountGuid) {
                                const discount = await discount_repository_1.discountRepository.findByGuid(optionData.discountGuid);
                                if (discount) {
                                    discountId = discount.id;
                                }
                            }
                            await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.upsertOptionPrice({
                                site_product_id: product.id,
                                product_sku: variantData.productSku,
                                copies: optionData.copies,
                                retail_price: optionData.retail_price,
                                currency: optionData.currency || 'CNY',
                                discount_id: discountId,
                                is_deleted: false // Reactivate
                            }, queryRunner);
                        }
                    }
                }
            }
            return true;
        });
    }
    /**
     * Xóa mềm sản phẩm (soft delete)
     * @param guid GUID của sản phẩm cần xóa
     */
    async deleteSiteProduct(guid) {
        return await this.handleWithTransaction(async (queryRunner) => {
            // 1. Kiểm tra sản phẩm có tồn tại không
            const product = await siteProduct_repository_1.siteProductRepository.findByGuid(guid);
            if (!product) {
                throw new NotFoundError_error_1.NotFoundError("Sản phẩm không tồn tại hoặc đã bị xóa");
            }
            // 2. Xóa mềm sản phẩm
            await siteProduct_repository_1.siteProductRepository.softDeleteByGuid(guid, queryRunner);
            // 3. Xóa mềm các biến thể của sản phẩm
            await siteProductVariant_repository_1.siteProductVariantRepository.softDeleteByProductId(product.id, queryRunner);
            // 4. Xóa mềm các option prices tương ứng theo Product ID
            await siteProductOptionPrice_repository_1.siteProductOptionPriceRepository.softDeleteByProductId(product.id, queryRunner);
            return true;
        });
    }
    /**
     * Chuyển đổi tên tiếng Việt thành slug (không dấu, gạch ngang)
     */
    generateSlug(text) {
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
exports.siteProductService = new SiteProductService();
//# sourceMappingURL=siteProduct.service.js.map