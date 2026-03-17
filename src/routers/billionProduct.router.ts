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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Tìm kiếm danh sách gói gốc thành công"
 *                 data:
 *                   page: 1
 *                   size: 10
 *                   totalCount: 150
 *                   totalPage: 15
 *                   result:
 *                     - id: 1
 *                       sku_id: "BILLION-10GB-30DAYS"
 *                       type: "esim"
 *                       name: "Data 10GB 30 Ngày"
 *                       high_flow_size: "10"
 *                       plan_type: "daily"
 *                       prices:
 *                         - id: 1
 *                           product_sku: "BILLION-10GB-30DAYS"
 *                           copies: "1"
 *                           retail_price: "100000"
 *                           settlement_price: "80000"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy chi tiết gói gốc thành công"
 *                 data:
 *                   sku_id: "BILLION-10GB-30DAYS"
 *                   name: "Data 10GB 30 Ngày"
 *                   desc: "Gói cước 10GB sử dụng trong 30 ngày tốc độ vượt trội"
 *                   price: 100000
 *                   status: "ACTIVE"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/detail/:sku_id", validateRequest(getBillionProductDetailSchema, ["params"]), billionProductController.getDetail);

export default router;
