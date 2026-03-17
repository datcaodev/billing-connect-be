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
 *             properties:
 *               name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               account_bank:
 *                 type: string
 *               account_no:
 *                 type: string
 *               account_name:
 *                 type: string
 *               tax_code:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
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
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               account_bank:
 *                 type: string
 *               account_no:
 *                 type: string
 *               account_name:
 *                 type: string
 *               tax_code:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
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
 *               agency_guid:
 *                 type: string
 *               packages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     site_product_guid:
 *                       type: string
 *                     package_name:
 *                       type: string
 *                     original_price:
 *                       type: number
 *                     agency_price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Thành công
 */
router.post("/price-table", validateRequest(agencyPriceSchema, ["body"]), agencyPriceController.createAgencyPriceTable);

/**
 * @swagger
 * /api/v1/billion-connect/agency/packages/{agency_guid}:
 *   get:
 *     summary: Lấy danh sách gói của đại lý
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: agency_guid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/packages/:agency_guid", validateRequest(agencyGuidParamSchema, ["params"]), agencyPriceController.getAgencyPackages);

export default router;
