"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const order_schema_1 = require("../schemas/order.schema");
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const orderRouter = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API quản lý đơn hàng
 */
/**
 * @swagger
 * /api/v1/billion-connect/order/search:
 *   get:
 *     summary: Lấy danh sách đơn hàng có phân trang và filter
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: "Định dạng: field:ASC|DESC (ví dụ: created_at:DESC)"
 *       - in: query
 *         name: transactionId
 *         schema:
 *           type: string
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [PENDING, SUCCESS]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [CREATE, PAID, FULFILLED, FAILED, FAILED_FULFILLED, FAILED_FULFILLED_EXTERNAL]
 *     responses:
 *       200:
 *         description: Thành công
 */
orderRouter.get("/search", (0, validateRequest_middleware_1.validateRequest)(order_schema_1.searchOrderSchema, ["query"]), order_controller_1.orderController.searchOrders);
/**
 * @swagger
 * /api/v1/billion-connect/order/{orderId}:
 *   get:
 *     summary: Lấy thông chi tiết đơn hàng theo orderId
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã đơn hàng (order_id)
 *     responses:
 *       200:
 *         description: Thành công
 */
orderRouter.get("/:orderId", (0, validateRequest_middleware_1.validateRequest)(order_schema_1.getOrderDetailsSchema, ["params"]), order_controller_1.orderController.getOrderDetails);
exports.default = orderRouter;
//# sourceMappingURL=order.router.js.map