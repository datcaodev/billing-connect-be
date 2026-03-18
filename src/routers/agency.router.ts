import express from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createAgencySchema, updateAgencySchema, searchAgencySchema, agencyPriceSchema } from "../schemas";
import { agencyGuidParamSchema } from "../schemas/agencyPrice.schema";
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
 *                   created_at: "2024-03-17T00:00:00.000Z"
 *                   updated_at: "2024-03-17T00:00:00.000Z"
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
 *         name: keyword
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
 *                       created_at: "2024-03-17T00:00:00.000Z"
 *                       updated_at: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/search", validateRequest(searchAgencySchema, ["query"]), agencyController.searchAgency);

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
 *             properties:
 *               agencyGuid:
 *                 type: string
 *               packages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     siteProductGuid:
 *                       type: string
 *                     packageName:
 *                       type: string
 *                     originalPrice:
 *                       type: number
 *                     agencyPrice:
 *                       type: number
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
 *                   - siteProductGuid: "uuid-product-1"
 *                     packageName: "Gói 10GB 7 Ngày"
 *                     originalPrice: 150000
 *                     agencyPrice: 120000
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/packages/:agencyGuid", validateRequest(agencyGuidParamSchema, ["params"]), agencyPriceController.getAgencyPackages);

export default router;
