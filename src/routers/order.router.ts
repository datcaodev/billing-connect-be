import express from "express";
import { orderController } from "../controllers/order.controller";
import { searchOrderSchema, getOrderDetailsSchema } from "../schemas/order.schema";
import { validateRequest } from "../middlewares/validateRequest.middleware";

const orderRouter = express.Router();

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
orderRouter.get(
    "/search",
    validateRequest(searchOrderSchema, ["query"]),
    orderController.searchOrders
);

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
orderRouter.get(
    "/:orderId",
    validateRequest(getOrderDetailsSchema, ["params"]),
    orderController.getOrderDetails
);

export default orderRouter;
