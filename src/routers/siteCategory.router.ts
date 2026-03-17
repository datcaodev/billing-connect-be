import express from "express";
import { siteCategoryController } from "../controllers/siteCategory.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createAreaSchema, createCountrySchema, getCountriesSchema, getAreasSchema, updateAreaSchema, updateCountrySchema } from "../schemas/siteCategory.schema";
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
 *               code:
 *                 type: string
 *               position:
 *                 type: number
 *     responses:
 *       200:
 *         description: Thành công
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
 *                 description: Tên quốc gia
 *               code:
 *                 type: string
 *                 description: Mã quốc gia
 *               area_guid:
 *                 type: string
 *                 format: uuid
 *                 description: GUID của khu vực (Area)
 *               position:
 *                 type: number
 *                 description: Thứ tự ưu tiên hiển thị
 *     responses:
 *       200:
 *         description: Thành công
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
 *               area_guid:
 *                 type: string
 *                 example: "uuid-khu-vuc-moi"
 *     responses:
 *       200:
 *         description: Thành công
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
 */
router.get(
    "/countries",
    validateRequest(getCountriesSchema, ["query"]),
    siteCategoryController.getCountries
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
 */
router.get("/areas", validateRequest(getAreasSchema, ["query"]), siteCategoryController.getAreas);

export default router;
