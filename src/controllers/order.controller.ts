import { Request, Response, NextFunction } from "express";
import { BaseController } from "../core/baseController.core";
import { orderService } from "../services/order.service";
import { ServiceResponse } from "../core/serviceResponse.core";

class OrderController extends BaseController {
    public searchOrders = async (req: Request, res: Response, next: NextFunction) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await orderService.searchOrders(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách đơn hàng thành công",
                    data
                });
            },
            res,
            next
        );
    };

    public getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
        return this.handleWithTryCatch(
            async () => {
                const { orderId } = req.params;
                const data = await orderService.getOrderDetails(orderId);
                return ServiceResponse.success({
                    message: "Lấy chi tiết đơn hàng thành công",
                    data
                });
            },
            res,
            next
        );
    };
}

export const orderController = new OrderController();
