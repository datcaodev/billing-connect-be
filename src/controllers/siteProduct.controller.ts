import { NextFunction, Request, Response } from "express";
import { BaseController } from "../core/baseController.core";
import { siteProductService } from "../services/siteProduct.service";
import { ServiceResponse } from "../core/serviceResponse.core";
import { uploadToCloudinary } from "../utils/cloudinary.util";
import { AuthenticatedRequest } from "../types";
import { ISearchVariantsByDiscountRequest } from "../schemas/siteProduct.schema";

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
                const { product_sku } = req.params;
                const data = await siteProductService.getOptionPricesBySku(product_sku);
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
                const { discount_guid } = req.params;
                const data = await siteProductService.getVariantsByDiscount(discount_guid);
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

            // Parse nested objects if they come as strings (common when using multipart/form-data)
            if (typeof data.variants === 'string') {
                data.variants = JSON.parse(data.variants);
            }
            if (typeof data.category_guids === 'string') {
                data.category_guids = JSON.parse(data.category_guids);
            }

            // Gộp area_guid vào mảng category_guids nếu có truyền lên
            if (data.area_guid) {
                if (!Array.isArray(data.category_guids)) {
                    data.category_guids = [];
                }
                if (!data.category_guids.includes(data.area_guid)) {
                    data.category_guids.push(data.area_guid);
                }
                // Xóa area_guid ra khỏi data nếu như trong db không có trường này, do nó đã được gộp vào danh mục
                delete data.area_guid;
            }

            // Xử lý upload ảnh lên Cloudinary nếu có file đính kèm
            if (req.file) {
                const imageUrl = await uploadToCloudinary(req.file);
                data.image_url = imageUrl;
            }

            const result = await siteProductService.createSiteProduct(data);
            return ServiceResponse.success({
                message: "Tạo sản phẩm thành công",
                data: result
            });
        }, res, next);
    };
}

export const siteProductController = new SiteProductController();
