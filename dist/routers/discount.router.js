"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const discount_schema_1 = require("../schemas/discount.schema");
const discount_controller_1 = require("../controllers/discount.controller");
const router = express_1.default.Router();
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
 *               startDate:
 *                 type: string
 *                 description: "Định dạng DD/MM/YYYY HH:mm:ss"
 *                 example: "01/06/2024 00:00:00"
 *               endDate:
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
 *                   startDate: "2024-06-01T00:00:00.000Z"
 *                   endDate: "2024-08-31T23:59:59.000Z"
 *                 error_code: null
 *                 code: 201
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/create", (0, validateRequest_middleware_1.validateRequest)(discount_schema_1.createDiscountSchema, ["body"]), discount_controller_1.discountController.createDiscount);
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
 *                       startDate: "2024-06-01T00:00:00.000Z"
 *                       endDate: "2024-08-31T23:59:59.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/search", (0, validateRequest_middleware_1.validateRequest)(discount_schema_1.searchDiscountSchema, ["query"]), discount_controller_1.discountController.searchDiscounts);
/**
 * @swagger
 * /api/v1/billion-connect/discount/search/all:
 *   get:
 *     summary: Tìm kiếm mã giảm giá (không phân trang)
 *     tags: [Discount]
 *     parameters:
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
 *                   - id: 1
 *                     guid: "uuid-discount"
 *                     name: "Giảm giá mùa hè 2024"
 *                     type: "PERCENTAGE"
 *                     value: 10
 *                     status: "ACTIVE"
 *                     startDate: "2024-06-01T00:00:00.000Z"
 *                     endDate: "2024-08-31T23:59:59.000Z"
 */
router.get("/search/all", (0, validateRequest_middleware_1.validateRequest)(discount_schema_1.searchDiscountAllSchema, ["query"]), discount_controller_1.discountController.searchDiscountsAll);
exports.default = router;
//# sourceMappingURL=discount.router.js.map