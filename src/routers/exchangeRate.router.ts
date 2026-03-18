import express from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createExchangeRateSchema, searchExchangeRateHistorySchema } from "../schemas/exchangeRate.schema";
import { exchangeRateController } from "../controllers";

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: ExchangeRate
 *   description: API for Exchange Rates
 */

/**
 * @swagger
 * /api/v1/billion-connect/exchange-rate/units:
 *   get:
 *     summary: Lấy danh sách đơn vị tiền tệ
 *     tags: [ExchangeRate]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Thành công"
 *                 data:
 *                   - name: "USD"
 *                     value: "USD"
 *                   - name: "CNY"
 *                     value: "CNY"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/units", exchangeRateController.getUnits);

/**
 * @swagger
 * /api/v1/billion-connect/exchange-rate/create:
 *   post:
 *     summary: Tạo tỷ giá
 *     tags: [ExchangeRate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetCurrency
 *               - rate
 *             properties:
 *               targetCurrency:
 *                 type: string
 *                 example: "VND"
 *               rate:
 *                 type: string
 *                 example: "25450"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Tạo tỷ giá thành công"
 *                 data: null
 *                 error_code: null
 *                 code: 201
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/create", validateRequest(createExchangeRateSchema, ["body"]), exchangeRateController.create);

/**
 * @swagger
 * /api/v1/billion-connect/exchange-rate/histories:
 *   get:
 *     summary: Lịch sử tỷ giá
 *     tags: [ExchangeRate]
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
 *         name: fromCurrencyCode
 *         schema:
 *           type: string
 *       - in: query
 *         name: toCurrencyCode
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
 *                 message: "Thành công"
 *                 data:
 *                   page: 1
 *                   size: 10
 *                   totalCount: 20
 *                   totalPage: 2
 *                   result:
 *                     - id: 1
 *                       currency: "VND"
 *                       rate: "25450"
 *                       startDate: "2024-03-17T00:00:00.000Z"
 *                       endDate: "2024-03-18T00:00:00.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/histories", validateRequest(searchExchangeRateHistorySchema, ["query"]), exchangeRateController.searchExchangeRateHistory);

/**
 * @swagger
 * /api/v1/billion-connect/exchange-rate:
 *   get:
 *     summary: Lấy thông tin cấu hình tỉ giá
 *     tags: [ExchangeRate]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Thành công"
 *                 data:
 *                   currency: "VND"
 *                   rate: "25450"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/", exchangeRateController.getExchangeRate);

export default router;