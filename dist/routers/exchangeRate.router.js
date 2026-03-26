"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const exchangeRate_schema_1 = require("../schemas/exchangeRate.schema");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
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
router.get("/units", controllers_1.exchangeRateController.getUnits);
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
router.post("/create", (0, validateRequest_middleware_1.validateRequest)(exchangeRate_schema_1.createExchangeRateSchema, ["body"]), controllers_1.exchangeRateController.create);
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
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: targetCurrency
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
router.get("/histories", (0, validateRequest_middleware_1.validateRequest)(exchangeRate_schema_1.searchExchangeRateHistorySchema, ["query"]), controllers_1.exchangeRateController.searchExchangeRateHistory);
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
router.get("/", controllers_1.exchangeRateController.getExchangeRate);
exports.default = router;
//# sourceMappingURL=exchangeRate.router.js.map