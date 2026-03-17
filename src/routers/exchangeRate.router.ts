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
 *         name: from_currency_code
 *         schema:
 *           type: string
 *       - in: query
 *         name: to_currency_code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/histories", validateRequest(searchExchangeRateHistorySchema, ["query"]), exchangeRateController.searchExchangeRateHistory);

export default router;