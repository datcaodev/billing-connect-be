import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest } from "../types";
import { discountService } from "../services/discount.service";

class DiscountController extends BaseController {
    public createDiscount = async (
        req: AuthenticatedRequest<object, object, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await discountService.createDiscount(req.body);
                return ServiceResponse.success({
                    message: "Tạo mã giảm giá thành công",
                    data: result
                });
            },
            res,
            next
        );
    };

    public searchDiscounts = async (
        req: AuthenticatedRequest<object, object, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await discountService.searchDiscounts(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách mã giảm giá thành công",
                    data: result
                });
            },
            res,
            next
        );
    };
}

export const discountController = new DiscountController();
