"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteProductController = void 0;
const baseController_core_1 = require("../core/baseController.core");
const siteProduct_service_1 = require("../services/siteProduct.service");
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const cloudinary_util_1 = require("../utils/cloudinary.util");
const ConflictError_error_1 = require("../utils/errors/ConflictError.error");
class SiteProductController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        /**
         * HTTP handler lấy danh sách sản phẩm với phân trang
         */
        this.searchProducts = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await siteProduct_service_1.siteProductService.searchProducts(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách sản phẩm thành công",
                    data
                });
            }, res, next);
        };
        /**
         * HTTP handler lấy danh sách option prices theo SKU
         */
        this.getOptionPricesBySku = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { productSku } = req.params;
                const { siteProductGuid } = req.query;
                const data = await siteProduct_service_1.siteProductService.getOptionPricesBySku(productSku, siteProductGuid);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách mức giá thành công",
                    data
                });
            }, res, next);
        };
        /**
         * HTTP handler lấy danh sách option prices theo discount_guid (nhóm theo variant)
         */
        this.getVariantsByDiscount = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { discountGuid } = req.params;
                const data = await siteProduct_service_1.siteProductService.getVariantsByDiscount(discountGuid);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách option theo mã giảm giá thành công",
                    data
                });
            }, res, next);
        };
        /**
         * HTTP handler xử lý tạo mới sản phẩm site
         */
        this.createSiteProduct = async (req, res, next) => {
            return await this.handleWithTryCatch(async () => {
                let data = req.body;
                if (!data.categoryGuids && data.areaGuid) {
                    throw new ConflictError_error_1.ConflictError("Sản phẩm phải thuộc ít nhất một vùng hoặc một quốc gia");
                }
                // Parse nested objects if they come as strings (common when using multipart/form-data)
                if (typeof data.variants === 'string') {
                    data.variants = JSON.parse(data.variants);
                }
                if (typeof data.categoryGuids === 'string') {
                    data.categoryGuids = JSON.parse(data.categoryGuids);
                }
                // Gộp areaGuid vào mảng categoryGuids nếu có truyền lên
                if (data.areaGuid) {
                    if (!Array.isArray(data.categoryGuids)) {
                        data.categoryGuids = [];
                    }
                    if (!data.categoryGuids.includes(data.areaGuid)) {
                        data.categoryGuids.push(data.areaGuid);
                    }
                    // Xóa areaGuid ra khỏi data nếu như trong db không có trường này, do nó đã được gộp vào danh mục
                    delete data.areaGuid;
                }
                // Xử lý upload ảnh lên Cloudinary nếu có file đính kèm
                if (req.file) {
                    const imageUrl = await (0, cloudinary_util_1.uploadToCloudinary)(req.file);
                    data.imageUrl = imageUrl;
                }
                const result = await siteProduct_service_1.siteProductService.createSiteProduct(data);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Tạo sản phẩm thành công",
                    data: result
                });
            }, res, next);
        };
        /**
         * HTTP handler bỏ giảm giá ra khỏi các copies được chỉ định
         */
        this.removeDiscountFromOptions = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { optionPriceGuids } = req.body;
                await siteProduct_service_1.siteProductService.removeDiscountFromOptions(optionPriceGuids);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Bỏ giảm giá khỏi các copies thành công",
                    data: true
                });
            }, res, next);
        };
        /**
         * HTTP handler xóa mềm sản phẩm
         */
        this.deleteSiteProduct = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                await siteProduct_service_1.siteProductService.deleteSiteProduct(guid);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Xóa sản phẩm thành công",
                    data: true
                });
            }, res, next);
        };
        /**
         * HTTP handler lấy danh sách variants và options của sản phẩm
         */
        this.getVariantsAndOptions = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                const data = await siteProduct_service_1.siteProductService.getVariantsAndOptionsByProductGuid(guid);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách variants và options thành công",
                    data
                });
            }, res, next);
        };
        /**
         * HTTP handler cập nhật thông tin sản phẩm và đồng bộ hóa các gói (variants) và tùy chọn (options)
         */
        this.updateSiteProduct = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                let data = req.body;
                // Parse nested objects if they come as strings (common when using multipart/form-data)
                if (typeof data.variants === 'string') {
                    data.variants = JSON.parse(data.variants);
                }
                // Xử lý upload ảnh lên Cloudinary nếu có file đính kèm
                if (req.file) {
                    const imageUrl = await (0, cloudinary_util_1.uploadToCloudinary)(req.file);
                    data.imageUrl = imageUrl;
                }
                const result = await siteProduct_service_1.siteProductService.updateSiteProduct(guid, data);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Cập nhật sản phẩm và đồng bộ hóa thành công",
                    data: result
                });
            }, res, next);
        };
    }
}
exports.siteProductController = new SiteProductController();
//# sourceMappingURL=siteProduct.controller.js.map