import express from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createDiscountSchema, searchDiscountSchema } from "../schemas/discount.schema";
import { discountController } from "../controllers/discount.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: API for Discounts
 */

/**
 * @swagger
 * /api/v1/billion-connect/discount/create:
 *   post:
 *     summary: Tạo mã giảm giá
 *     tags: [Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - value
 *               - start_date
 *               - end_date
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Giảm giá mùa hè 2024"
 *               type:
 *                 type: string
 *                 enum: [PERCENTAGE, FIXED]
 *                 example: "PERCENTAGE"
 *               value:
 *                 type: number
 *                 example: 10
 *               start_date:
 *                 type: string
 *                 description: "Định dạng DD/MM/YYYY HH:mm:ss"
 *                 example: "01/06/2024 00:00:00"
 *               end_date:
 *                 type: string
 *                 description: "Định dạng DD/MM/YYYY HH:mm:ss"
 *                 example: "31/08/2024 23:59:59"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Tạo mã giảm giá thành công"
 *                 data:
 *                   id: 1
 *                   guid: "uuid-discount"
 *                   name: "Giảm giá mùa hè 2024"
 *                   type: "PERCENTAGE"
 *                   value: 10
 *                   start_date: "2024-06-01T00:00:00.000Z"
 *                   end_date: "2024-08-31T23:59:59.000Z"
 *                 error_code: null
 *                 code: 201
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/create", validateRequest(createDiscountSchema, ["body"]), discountController.createDiscount);

/**
 * @swagger
 * /api/v1/billion-connect/discount/search:
 *   get:
 *     summary: Tìm kiếm mã giảm giá
 *     tags: [Discount]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách mã giảm giá thành công"
 *                 data:
 *                   page: 1
 *                   size: 10
 *                   totalCount: 5
 *                   totalPage: 1
 *                   result:
 *                     - id: 1
 *                       guid: "uuid-discount"
 *                       name: "Giảm giá mùa hè 2024"
 *                       type: "PERCENTAGE"
 *                       value: 10
 *                       status: "ACTIVE"
 *                       start_date: "2024-06-01T00:00:00.000Z"
 *                       end_date: "2024-08-31T23:59:59.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/search", validateRequest(searchDiscountSchema, ["query"]), discountController.searchDiscounts);

export default router;
