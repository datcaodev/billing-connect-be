import express from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createAgencySchema, updateAgencySchema, searchAgencySchema, agencyPriceSchema } from "../schemas";
import { agencyGuidParamSchema, getAgencyPackagesQuerySchema, getAgencyPackagesFilterQuerySchema, updateAgencyPackagePriceSchema, getAgencyPackagesAllQuerySchema } from "../schemas/agencyPrice.schema";
import { agencyController, agencyPriceController } from "../controllers";

const router = express.Router();

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
router.post(
    "/create",
    validateRequest(createAgencySchema, ["body"]),
    agencyController.createAgency
);

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
router.post(
    "/update/:guid",
    validateRequest(updateAgencySchema, ["body"]),
    agencyController.updateAgency
);

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
router.post("/delete/:guid", agencyController.deleteAgency);

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
router.get("/search", validateRequest(searchAgencySchema, ["query"]), agencyController.searchAgency);

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
router.get("/all", agencyController.getAllAgencies);

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
router.post("/price-table", validateRequest(agencyPriceSchema, ["body"]), agencyPriceController.createAgencyPriceTable);

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
router.get("/packages/:agencyGuid", validateRequest(agencyGuidParamSchema, ["params"]), validateRequest(getAgencyPackagesQuerySchema, ["query"]), agencyPriceController.getAgencyPackages);

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
router.get("/packages/:agencyGuid/detail", validateRequest(agencyGuidParamSchema, ["params"]), validateRequest(getAgencyPackagesAllQuerySchema, ["query"]), agencyPriceController.getAgencyPackagesAll);

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
 *         name: regionGuid
 *         schema:
 *           type: string
 *         description: GUID của Vùng (Category)
 *       - in: query
 *         name: countryGuid
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Danh sách GUID của Quốc gia (Category)
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/packages/:agencyGuid/filter", validateRequest(agencyGuidParamSchema, ["params"]), validateRequest(getAgencyPackagesFilterQuerySchema, ["query"]), agencyPriceController.getAgencyPackagesFilter);

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
router.patch("/packages/price", validateRequest(updateAgencyPackagePriceSchema, ["body"]), agencyPriceController.updatePackagePrice);

export default router;
