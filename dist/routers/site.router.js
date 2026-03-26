"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
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
router.get("/countries", controllers_1.siteController.getAllBillionCountries);
/**
 * @swagger
 * /api/v1/billion-connect/site/areas:
 *   get:
 *     summary: Lấy danh sách vùng (Châu lục)
 *     tags: [Site]
 *     responses:
 *       200:
 *         description: Thành công
 */
// lấy danh sách vùng
router.get("/areas", controllers_1.siteController.getAllAreas);
exports.default = router;
//# sourceMappingURL=site.router.js.map