import express from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { getBillionProductDetailSchema, searchBillionProductSchema } from "../schemas/billionProduct.schema";
import { billionProductController } from "../controllers/billionProduct.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BillionProduct
 *   description: API for Billion Products
 */

/**
 * @swagger
 * /api/v1/billion-connect/product/search:
 *   get:
 *     summary: Tìm kiếm danh sách gói gốc
 *     tags: [BillionProduct]
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
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/search", validateRequest(searchBillionProductSchema, ["query"]), billionProductController.searchProducts);

/**
 * @swagger
 * /api/v1/billion-connect/product/detail/{sku_id}:
 *   get:
 *     summary: Lấy chi tiết gói gốc
 *     tags: [BillionProduct]
 *     parameters:
 *       - in: path
 *         name: sku_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/detail/:sku_id", validateRequest(getBillionProductDetailSchema, ["params"]), billionProductController.getDetail);

export default router;
