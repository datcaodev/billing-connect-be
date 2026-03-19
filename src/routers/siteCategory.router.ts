import express from "express";
import { siteCategoryController } from "../controllers/siteCategory.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createAreaSchema, createCountrySchema, getCountriesSchema, getAreasSchema, updateAreaSchema, updateCountrySchema, getAreasAllSchema, getCountriesByAreaSchema } from "../schemas/siteCategory.schema";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SiteCategory
 *   description: API for Site Categories (Areas, Countries)
 */

/**
 * @swagger
 * /api/v1/billion-connect/category/area/create:
 *   post:
 *     summary: Tạo khu vực mới (Category cha)
 *     tags: [SiteCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Châu Á"
 *               code:
 *                 type: string
 *                 example: "ASIA"
 *               position:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Tạo khu vực thành công"
 *                 data:
 *                   guid: "uuid-area-asia"
 *                   name: "Châu Á"
 *                   code: "ASIA"
 *                   countryMcc: null
 *                   position: 1
 *                   isActive: true
 *                   createdAt: "2024-03-17T00:00:00.000Z"
 *                   updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 201
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post(
    "/area/create",
    validateRequest(createAreaSchema, ["body"]),
    siteCategoryController.createArea
);

/**
 * @swagger
 * /api/v1/billion-connect/category/area/{guid}/update:
 *   post:
 *     summary: Cập nhật thông tin khu vực
 *     tags: [SiteCategory]
 *     parameters:
 *       - in: path
 *         name: guid
 *         required: true
 *         schema:
 *           type: string
 *         description: GUID của khu vực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Châu Á - Thái Bình Dương"
 *               position:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Cập nhật khu vực thành công"
 *                 data: true
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post(
    "/area/:guid/update",
    validateRequest(updateAreaSchema, ["body"]),
    siteCategoryController.updateArea
);

/**
 * @swagger
 * /api/v1/billion-connect/category/country/create:
 *   post:
 *     summary: Tạo quốc gia mới (Category con)
 *     tags: [SiteCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - area_guid
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Việt Nam"
 *               code:
 *                 type: string
 *                 example: "VN"
 *               areaGuid:
 *                 type: string
 *                 format: uuid
 *                 example: "uuid-area-asia"
 *               position:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Tạo quốc gia thành công"
 *                 data:
 *                   guid: "uuid-country-vn"
 *                   name: "Việt Nam"
 *                   code: "VN"
 *                   countryMcc: "452"
 *                   position: 1
 *                   isActive: true
 *                   createdAt: "2024-03-17T00:00:00.000Z"
 *                   updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 201
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post(
    "/country/create",
    validateRequest(createCountrySchema, ["body"]),
    siteCategoryController.createCountry
);

/**
 * @swagger
 * /api/v1/billion-connect/category/country/{guid}/update:
 *   post:
 *     summary: Cập nhật thông tin quốc gia
 *     tags: [SiteCategory]
 *     parameters:
 *       - in: path
 *         name: guid
 *         required: true
 *         schema:
 *           type: string
 *         description: GUID của quốc gia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Việt Nam (Cập nhật)"
 *               position:
 *                 type: number
 *                 example: 3
 *               areaGuid:
 *                 type: string
 *                 example: "uuid-khu-vuc-moi"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Cập nhật quốc gia thành công"
 *                 data: true
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.post(
    "/country/:guid/update",
    validateRequest(updateCountrySchema, ["body"]),
    siteCategoryController.updateCountry
);

/**
 * @swagger
 * /api/v1/billion-connect/category/countries:
 *   get:
 *     summary: Lấy chuỗi danh sách quốc gia (có phân trang)
 *     tags: [SiteCategory]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang số mấy (mặc định 1)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Số lượng item trên một trang (mặc định 10)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tên quốc gia
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Mã quốc gia
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách quốc gia thành công"
 *                 data:
 *                   page: 1
 *                   size: 10
 *                   totalCount: 20
 *                   totalPage: 2
 *                   result:
 *                     - guid: "uuid-country-vn"
 *                       name: "Việt Nam"
 *                       code: "VN"
 *                       countryMcc: "452"
 *                       position: 1
 *                       isActive: true
 *                       createdAt: "2024-03-17T00:00:00.000Z"
 *                       updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get(
    "/countries",
    validateRequest(getCountriesSchema, ["query"]),
    siteCategoryController.getCountries
);

/**
 * @swagger
 * /api/v1/billion-connect/category/countries/all:
 *   get:
 *     summary: Lấy danh sách quốc gia (không phân trang, lọc theo ID vùng)
 *     tags: [SiteCategory]
 *     parameters:
 *       - in: query
 *         name: areaGuid
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Tìm kiếm theo GUID khu vực
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách quốc gia thành công"
 *                 data:
 *                   - guid: "uuid-country-vn"
 *                     name: "Việt Nam"
 *                     code: "VN"
 *                     countryMcc: "452"
 *                     position: 1
 *                     isActive: true
 *                     createdAt: "2024-03-17T00:00:00.000Z"
 *                     updatedAt: "2024-03-17T00:00:00.000Z"
 */
router.get(
    "/countries/all",
    validateRequest(getCountriesByAreaSchema, ["query"]),
    siteCategoryController.getCountriesByArea
);

/**
 * @swagger
 * /api/v1/billion-connect/category/areas:
 *   get:
 *     summary: Lấy danh sách khu vực
 *     tags: [SiteCategory]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang (mặc định 1)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Số phần tử mỗi trang (mặc định 10)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên khu vực
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo mã khu vực
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách khu vực thành công"
 *                 data:
 *                   page: 1
 *                   size: 10
 *                   totalCount: 5
 *                   totalPage: 1
 *                   result:
 *                     - guid: "uuid-area-asia"
 *                       name: "Châu Á"
 *                       code: "ASIA"
 *                       countryMcc: null
 *                       position: 1
 *                       isActive: true
 *                       createdAt: "2024-03-17T00:00:00.000Z"
 *                       updatedAt: "2024-03-17T00:00:00.000Z"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
router.get("/areas", validateRequest(getAreasSchema, ["query"]), siteCategoryController.getAreas);

/**
 * @swagger
 * /api/v1/billion-connect/category/areas/all:
 *   get:
 *     summary: Lấy danh sách khu vực (không phân trang)
 *     tags: [SiteCategory]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên khu vực
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo mã khu vực
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 success: true
 *                 message: "Lấy danh sách khu vực thành công"
 *                 data:
 *                   - guid: "uuid-area-asia"
 *                     name: "Châu Á"
 *                     code: "ASIA"
 *                     countryMcc: null
 *                     position: 1
 *                     isActive: true
 *                     createdAt: "2024-03-17T00:00:00.000Z"
 *                     updatedAt: "2024-03-17T00:00:00.000Z"
 *                     countries:
 *                       - guid: "uuid-country-vn"
 *                         name: "Việt Nam"
 *                         code: "VN"
 *                         countryMcc: "452"
 */
router.get("/areas/all", validateRequest(getAreasAllSchema, ["query"]), siteCategoryController.getAreasAll);

export default router;
