import express from "express";
import { syncController } from "../controllers/sync.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sync
 *   description: APIs for data synchronization
 */

/**
 * @swagger
 * /api/v1/billion-connect/sync/refresh-views:
 *   post:
 *     summary: Đồng bộ dữ liệu lên website (Làm mới materialized views)
 *     tags: [Sync]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Đồng bộ dữ liệu lên website thành công"
 *                 data:
 *                   type: boolean
 *                   example: true
 */
router.post("/refresh-views", syncController.refreshViews);

export default router;
