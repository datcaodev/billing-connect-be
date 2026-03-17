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
 *             properties:
 *               name:
 *                 type: string
 *               discount_type:
 *                 type: string
 *               discount_value:
 *                 type: number
 *               status:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               require_packages_count:
 *                 type: number
 *               description:
 *                 type: string
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
