import { NextFunction, Request, Response } from "express";
import { BaseController } from "../core/baseController.core";
import { siteProductService } from "../services/siteProduct.service";
import { ServiceResponse } from "../core/serviceResponse.core";
import { uploadToCloudinary } from "../utils/cloudinary.util";
import { AuthenticatedRequest } from "../types";
import { ISearchVariantsByDiscountRequest } from "../schemas/siteProduct.schema";
import { ConflictError } from "../utils/errors/ConflictError.error";

class SiteProductController extends BaseController {
    /**
     * HTTP handler lấy danh sách sản phẩm với phân trang
     */
    public searchProducts = async (
        req: AuthenticatedRequest<object, object, object, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await siteProductService.searchProducts(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách sản phẩm thành công",
                    data
                });
            },
            res,
            next
        );
    };

    /**
     * HTTP handler lấy danh sách option prices theo SKU
     */
    public getOptionPricesBySku = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { productSku } = req.params;
                const { siteProductGuid } = req.query as any;
                const data = await siteProductService.getOptionPricesBySku(productSku, siteProductGuid);
                return ServiceResponse.success({
                    message: "Lấy danh sách mức giá thành công",
                    data
                });
            },
            res,
            next
        );
    };

    /**
     * HTTP handler lấy danh sách option prices theo discount_guid (nhóm theo variant)
     */
    public getVariantsByDiscount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { discountGuid } = req.params;
                const data = await siteProductService.getVariantsByDiscount(discountGuid);
                return ServiceResponse.success({
                    message: "Lấy danh sách option theo mã giảm giá thành công",
                    data
                });
            },
            res,
            next
        );
    };

    /**
     * HTTP handler xử lý tạo mới sản phẩm site
     */
    public createSiteProduct = async (req: Request, res: Response, next: NextFunction) => {
        return await this.handleWithTryCatch(async () => {
            let data = req.body;

            if (!data.categoryGuids && data.areaGuid) {
                throw new ConflictError("Sản phẩm phải thuộc ít nhất một vùng hoặc một quốc gia");
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
                const imageUrl = await uploadToCloudinary(req.file);
                data.imageUrl = imageUrl;
            }

            const result = await siteProductService.createSiteProduct(data);
            return ServiceResponse.success({
                message: "Tạo sản phẩm thành công",
                data: result
            });
        }, res, next);
    };

    /**
     * HTTP handler bỏ giảm giá ra khỏi các copies được chỉ định
     */
    public removeDiscountFromOptions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { optionPriceGuids } = req.body;
                await siteProductService.removeDiscountFromOptions(optionPriceGuids);
                return ServiceResponse.success({
                    message: "Bỏ giảm giá khỏi các copies thành công",
                    data: true
                });
            },
            res,
            next
        );
    };

    /**
     * HTTP handler xóa mềm sản phẩm
     */
    public deleteSiteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { guid } = req.params;
                await siteProductService.deleteSiteProduct(guid);
                return ServiceResponse.success({
                    message: "Xóa sản phẩm thành công",
                    data: true
                });
            },
            res,
            next
        );
    };

    /**
     * HTTP handler lấy danh sách variants và options của sản phẩm
     */
    public getVariantsAndOptions = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { guid } = req.params;
                const data = await siteProductService.getVariantsAndOptionsByProductGuid(guid);
                return ServiceResponse.success({
                    message: "Lấy danh sách variants và options thành công",
                    data
                });
            },
            res,
            next
        );
    };
}

export const siteProductController = new SiteProductController();
