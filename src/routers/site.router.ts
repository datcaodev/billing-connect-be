import express from "express";
import { siteController } from "../controllers";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { createAreaSchema } from "../schemas/siteCategory.schema";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Site
 *   description: API for Sites
 */

/**
 * @swagger
 * /api/v1/billion-connect/site/countries:
 *   get:
 *     summary: Lấy danh sách quốc gia
 *     tags: [Site]
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
 *                   - code: "VN"
 *                     name: "Việt Nam"
 *                   - code: "JP"
 *                     name: "Nhật Bản"
 *                   - code: "KR"
 *                     name: "Hàn Quốc"
 *                 error_code: null
 *                 code: 200
 *                 description: "Message is init response"
 *                 responseCode: 200
 *                 timestamp: 1710660000000
 */
// lấy danh sách quốc gia
router.get("/countries", siteController.getAllBillionCountries);


export default router;