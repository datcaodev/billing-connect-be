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
 */
router.get("/search", validateRequest(searchDiscountSchema, ["query"]), discountController.searchDiscounts);

export default router;
