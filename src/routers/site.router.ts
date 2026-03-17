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
 */
// lấy danh sách quốc gia
router.get("/countries", siteController.getAllBillionCountries);


export default router;