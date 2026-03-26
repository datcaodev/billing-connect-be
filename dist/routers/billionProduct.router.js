"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const billionProduct_schema_1 = require("../schemas/billionProduct.schema");
const billionProduct_controller_1 = require("../controllers/billionProduct.controller");
const router = express_1.default.Router();
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
 *         name: skuId
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo mã SKU
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên sản phẩm
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
 *                       skuId: "BILLION-10GB-30DAYS"
 *                       type: "esim"
 *                       name: "Data 10GB 30 Ngày"
 *                       highFlowSize: "10"
 *                       planType: "daily"
 *                       prices:
 *                         - id: 1
 *                           productSku: "BILLION-10GB-30DAYS"
 *                           copies: "1"
 *                           retailPrice: "100000"
 *                           settlementPrice: "80000"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/search", (0, validateRequest_middleware_1.validateRequest)(billionProduct_schema_1.searchBillionProductSchema, ["query"]), billionProduct_controller_1.billionProductController.searchProducts);
/**
 * @swagger
 * /api/v1/billion-connect/product/detail/{skuId}:
 *   get:
 *     summary: Lấy chi tiết gói gốc
 *     tags: [BillionProduct]
 *     parameters:
 *       - in: path
 *         name: skuId
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
 *                   skuId: "BILLION-10GB-30DAYS"
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
router.get("/detail/:skuId", (0, validateRequest_middleware_1.validateRequest)(billionProduct_schema_1.getBillionProductDetailSchema, ["params"]), billionProduct_controller_1.billionProductController.getDetail);
exports.default = router;
//# sourceMappingURL=billionProduct.router.js.map