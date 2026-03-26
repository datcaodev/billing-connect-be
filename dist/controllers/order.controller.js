"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const baseController_core_1 = require("../core/baseController.core");
const order_service_1 = require("../services/order.service");
const serviceResponse_core_1 = require("../core/serviceResponse.core");
class OrderController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.searchOrders = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await order_service_1.orderService.searchOrders(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách đơn hàng thành công",
                    data
                });
            }, res, next);
        };
        this.getOrderDetails = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { orderId } = req.params;
                const data = await order_service_1.orderService.getOrderDetails(orderId);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy chi tiết đơn hàng thành công",
                    data
                });
            }, res, next);
        };
    }
}
exports.orderController = new OrderController();
//# sourceMappingURL=order.controller.js.map