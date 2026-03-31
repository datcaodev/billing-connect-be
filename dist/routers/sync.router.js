"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sync_controller_1 = require("../controllers/sync.controller");
const router = express_1.default.Router();
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
router.post("/refresh-views", sync_controller_1.syncController.refreshViews);
exports.default = router;
//# sourceMappingURL=sync.router.js.map