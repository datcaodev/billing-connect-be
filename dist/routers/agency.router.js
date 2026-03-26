"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_middleware_1 = require("../middlewares/validateRequest.middleware");
const schemas_1 = require("../schemas");
const agencyPrice_schema_1 = require("../schemas/agencyPrice.schema");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Agency
 *   description: API for Agencies
 */
/**
 * @swagger
 * /api/v1/billion-connect/agency/create:
 *   post:
 *     summary: Tạo đại lý
 *     tags: [Agency]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               code:
 *                 type: string
 *                 example: "AG001"
 *               name:
 *                 type: string
 *                 example: "Đại lý Cầu Giấy"
 *               email:
 *                 type: string
 *                 example: "caugiay@agency.com"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               address:
 *                 type: string
 *                 example: "123 Cầu Giấy, Hà Nội"
 *               website:
 *                 type: string
 *                 example: "https://agency-caugiay.com"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Tạo đại lý thành công"
 *                 data:
 *                   guid: "uuid-agency"
 *                   code: "AG001"
 *                   name: "Đại lý Cầu Giấy"
 *                   email: "caugiay@agency.com"
 *                   phone: "0987654321"
 *                   address: "123 Cầu Giấy, Hà Nội"
 *                   website: "https://agency-caugiay.com"
 *                   createdAt: "2024-03-17T00:00:00.000Z"
 *                   updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 201
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/create", (0, validateRequest_middleware_1.validateRequest)(schemas_1.createAgencySchema, ["body"]), controllers_1.agencyController.createAgency);
/**
 * @swagger
 * /api/v1/billion-connect/agency/update/{guid}:
 *   post:
 *     summary: Cập nhật đại lý
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: guid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Đại lý ABC (Cập nhật)"
 *               email:
 *                 type: string
 *                 example: "update@agency.com"
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               address:
 *                 type: string
 *                 example: "Số 1 Đại Cồ Việt, Hà Nội"
 *               website:
 *                 type: string
 *                 example: "https://new-website.com"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Cập nhật đại lý thành công"
 *                 data: true
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/update/:guid", (0, validateRequest_middleware_1.validateRequest)(schemas_1.updateAgencySchema, ["body"]), controllers_1.agencyController.updateAgency);
/**
 * @swagger
 * /api/v1/billion-connect/agency/delete/{guid}:
 *   post:
 *     summary: Xóa đại lý
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: guid
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
 *                 message: "Xóa đại lý thành công"
 *                 data: true
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/delete/:guid", controllers_1.agencyController.deleteAgency);
/**
 * @swagger
 * /api/v1/billion-connect/agency/search:
 *   get:
 *     summary: Tìm kiếm đại lý
 *     tags: [Agency]
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
 *         name: code
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
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
 *                 message: "Tìm kiếm đại lý thành công"
 *                 data:
 *                   page: 1
 *                   size: 10
 *                   totalCount: 5
 *                   totalPage: 1
 *                   result:
 *                     - guid: "uuid-agency"
 *                       code: "AG001"
 *                       name: "Đại lý Cầu Giấy"
 *                       email: "caugiay@agency.com"
 *                       phone: "0987654321"
 *                       address: "123 Cầu Giấy, Hà Nội"
 *                       website: "https://agency-caugiay.com"
 *                       createdAt: "2024-03-17T00:00:00.000Z"
 *                       updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/search", (0, validateRequest_middleware_1.validateRequest)(schemas_1.searchAgencySchema, ["query"]), controllers_1.agencyController.searchAgency);
/**
 * @swagger
 * /api/v1/billion-connect/agency/all:
 *   get:
 *     summary: Lấy danh sách tất cả đại lý (không phân trang)
 *     tags: [Agency]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách tất cả đại lý thành công"
 *                 data:
 *                   - guid: "uuid-agency"
 *                     code: "AG001"
 *                     name: "Đại lý Cầu Giấy"
 *                     email: "caugiay@agency.com"
 *                     phone: "0987654321"
 *                     address: "123 Cầu Giấy, Hà Nội"
 *                     website: "https://agency-caugiay.com"
 *                     createdAt: "2024-03-17T00:00:00.000Z"
 *                     updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/all", controllers_1.agencyController.getAllAgencies);
/**
 * @swagger
 * /api/v1/billion-connect/agency/price-table:
 *   post:
 *     summary: Cập nhật bảng giá đại lý
 *     tags: [Agency]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - agencyGuid
 *               - formula
 *               - packages
 *             properties:
 *               agencyGuid:
 *                 type: string
 *                 format: uuid
 *               formula:
 *                 type: string
 *                 enum: [INCREASE_PERCENT, DECREASE_PERCENT, INCREASE_FIXED, DECREASE_FIXED, RETAIL_PRICE]
 *               amount:
 *                 type: number
 *               remark:
 *                 type: string
 *               packages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     skuId:
 *                       type: string
 *                     type:
 *                       type: string
 *                     name:
 *                       type: string
 *                     highFlowSize:
 *                       type: string
 *                     planType:
 *                       type: string
 *                     prices:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productSku:
 *                             type: string
 *                           copies:
 *                             type: string
 *                           retailPrice:
 *                             type: string
 *                           settlementPrice:
 *                             type: string
 *           example:
 *             agencyGuid: "uuid-agency"
 *             formula: "INCREASE_PERCENT"
 *             amount: 10
 *             remark: "Tăng 10% giá"
 *             packages:
 *               - skuId: "uuid-product-1"
 *                 type: "esim"
 *                 name: "Gói 10GB 7 Ngày"
 *                 highFlowSize: "10"
 *                 planType: "daily"
 *                 prices:
 *                   - productSku: "uuid-product-1"
 *                     copies: "1"
 *                     retailPrice: "150000"
 *                     settlementPrice: "130000"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Cập nhật bảng giá đại lý thành công"
 *                 data: true
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post("/price-table", (0, validateRequest_middleware_1.validateRequest)(schemas_1.agencyPriceSchema, ["body"]), controllers_1.agencyPriceController.createAgencyPriceTable);
/**
 * @swagger
 * /api/v1/billion-connect/agency/packages/{agencyGuid}:
 *   get:
 *     summary: Lấy danh sách gói của đại lý
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: agencyGuid
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Trang hiện tại (mặc định 0)
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Số lượng phần tử mỗi trang (mặc định 20)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sắp xếp theo thời gian tạo (mặc định DESC)
 *       - in: query
 *         name: productSku
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo mã gói
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên gói
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách gói của đại lý thành công"
 *                 data:
 *                   content:
 *                     - guid: "uuid-bundle-1"
 *                       skuId: "uuid-product-1"
 *                       name: "Gói 10GB 7 Ngày"
 *                       type: "esim"
 *                       highFlowSize: "10"
 *                       planType: "daily"
 *                       prices:
 *                         - guid: "uuid-price-1"
 *                           productSku: "uuid-product-1"
 *                           copies: "1"
 *                           retailPrice: "150000"
 *                           settlementPrice: "130000"
 *                           finalPrice: "120000"
 *                   currentPage: 0
 *                   pageSize: 20
 *                   total: 1
 *                   pagesCount: 1
 *                   hasNext: false
 *                   hasPrevious: false
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/packages/:agencyGuid", (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.agencyGuidParamSchema, ["params"]), (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.getAgencyPackagesQuerySchema, ["query"]), controllers_1.agencyPriceController.getAgencyPackages);
/**
 * @swagger
 * /api/v1/billion-connect/agency/packages/{agencyGuid}/detail:
 *   get:
 *     summary: Lấy chi tiết bảng giá + thông tin của đại lý (không phân trang)
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: agencyGuid
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: productSku
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo mã gói
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên gói
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy bảng giá đại lý thành công"
 *                 data:
 *                   agency:
 *                     guid: "uuid-agency"
 *                     code: "AG001"
 *                     name: "Đại lý Cầu Giấy"
 *                     email: "caugiay@agency.com"
 *                     phone: "0987654321"
 *                     address: "123 Cầu Giấy, Hà Nội"
 *                     website: "https://agency-caugiay.com"
 *                     formula: null
 *                     formula_note: null
 *                   packages:
 *                     - guid: "uuid-bundle-1"
 *                       skuId: "uuid-product-1"
 *                       name: "Gói 10GB 7 Ngày"
 *                       type: "esim"
 *                       highFlowSize: "10"
 *                       planType: "daily"
 *                       prices:
 *                         - guid: "uuid-price-1"
 *                           productSku: "uuid-product-1"
 *                           copies: "1"
 *                           retailPrice: "150000"
 *                           settlementPrice: "130000"
 *                           finalPrice: "120000"
 */
router.get("/packages/:agencyGuid/detail", (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.agencyGuidParamSchema, ["params"]), (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.getAgencyPackagesAllQuerySchema, ["query"]), controllers_1.agencyPriceController.getAgencyPackagesAll);
/**
 * @swagger
 * /api/v1/billion-connect/agency/packages/{agencyGuid}/filter:
 *   get:
 *     summary: Lấy danh sách gói của đại lý (có filter theo Vùng/Quốc gia)
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: agencyGuid
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *       - in: query
 *         name: productSku
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: countryMcc
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Danh sách MCC của Quốc gia
 *       - in: query
 *         name: areaName
 *         schema:
 *           type: string
 *         description: Tên vùng (Châu lục)
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/packages/:agencyGuid/filter", (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.agencyGuidParamSchema, ["params"]), (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.getAgencyPackagesFilterQuerySchema, ["query"]), controllers_1.agencyPriceController.getAgencyPackagesFilter);
/**
 * @swagger
 * /api/v1/billion-connect/agency/packages/price:
 *   patch:
 *     summary: Cập nhật giá copies theo đại lý
 *     tags: [Agency]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agencyGuid:
 *                 type: string
 *               copiesGuid:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Thành công
 */
router.patch("/packages/price", (0, validateRequest_middleware_1.validateRequest)(agencyPrice_schema_1.updateAgencyPackagePriceSchema, ["body"]), controllers_1.agencyPriceController.updatePackagePrice);
exports.default = router;
//# sourceMappingURL=agency.router.js.map