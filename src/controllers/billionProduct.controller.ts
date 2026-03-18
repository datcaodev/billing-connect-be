import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest } from "../types";
import { billionProductService } from "../services/billionProduct.service";
import { ErrorCode } from "../enums";
import { ISearchBillionProduct } from "../schemas";

class BillionProductController extends BaseController {
    public searchProducts = async (
        req: AuthenticatedRequest<object, object, object, ISearchBillionProduct>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await billionProductService.searchProducts(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách gói thành công",
                    data
                });
            },
            res,
            next
        );
    };

    public getDetail = async (
        req: AuthenticatedRequest<{ skuId: string }, object, object, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { skuId } = req.params;
                const data = await billionProductService.getProductDetail(skuId);
                if (!data) {
                    return ServiceResponse.failure({
                        headerStatusCode: 404, // map to StatusCodes.NOT_FOUND if needed, but 404 works
                        message: "Không tìm thấy gói này",
                        code: ErrorCode.NOT_FOUND
                    });
                }
                return ServiceResponse.success({
                    message: "Lấy chi tiết gói thành công",
                    data
                });
            },
            res,
            next
        );
    };
}

export const billionProductController = new BillionProductController();
