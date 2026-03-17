import express, { Router } from "express";
import { validateRequest, validateRequestWithForm } from "../middlewares/validateRequest.middleware";
import { siteProductSchema, searchSiteProductSchema, getOptionPriceSchema, searchVariantsByDiscountSchema } from "../schemas/siteProduct.schema";
import { siteProductController } from "../controllers/siteProduct.controller";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const siteProductRouter: Router = (() => {
    const router = express.Router();

    /**
     * @swagger
     * tags:
     *   name: SiteProduct
     *   description: API for Site Products
     */

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/create:
     *   post:
     *     summary: Tạo sản phẩm site
     *     tags: [SiteProduct]
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - category_guids
     *               - variants
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Sim Du Lịch Nhật Bản"
     *               desc:
     *                 type: string
     *                 example: "Sim 4G tốc độ cao, 10GB dung lượng"
     *               image:
     *                 type: string
     *                 format: binary
     *               image_url:
     *                 type: string
     *                 example: "https://example.com/image.jpg"
     *               category_guids:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["uuid-category-sim", "uuid-category-japan"]
     *               area_guid:
     *                 type: string
     *                 example: "uuid-area-asia"
     *               variants:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     product_sku:
     *                       type: string
     *                       example: "JP-10GB-7DAYS"
     *                     high_flow_size:
     *                       type: string
     *                       example: "10485760"
     *                     plan_type:
     *                       type: string
     *                       example: "1"
     *                     name:
     *                       type: string
     *                       example: "Gói 10GB - 7 Ngày"
     *                     options:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           copies:
     *                             type: number
     *                             example: 1
     *                           discount_guid:
     *                             type: string
     *                             example: "uuid-discount-summer"
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Tạo sản phẩm thành công"
     *                 data: true
     *                 error_code: null
     *                 code: 201
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.post(
        "/create",
        upload.single("image"),
        validateRequestWithForm(siteProductSchema, ["body"]),
        siteProductController.createSiteProduct
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/search:
     *   get:
     *     summary: Tìm kiếm sản phẩm site
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: Số trang
     *       - in: query
     *         name: pageSize
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Số lượng cần lấy
     *       - in: query
     *         name: sku_id
     *         schema:
     *           type: string
     *         description: SKU ID
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         description: Tên sản phẩm
     *       - in: query
     *         name: status
     *         schema:
     *           type: string
     *         description: Trạng thái
     *       - in: query
     *         name: category_code
     *         schema:
     *           type: string
     *         description: Mã danh mục
     *       - in: query
     *         name: category_name
     *         schema:
     *           type: string
     *         description: Tên danh mục
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Lấy danh sách sản phẩm thành công"
     *                 data:
     *                   page: 1
     *                   size: 10
     *                   totalCount: 50
     *                   totalPage: 5
     *                   result:
     *                     - guid: "uuid-site-product"
     *                       name: "Sim Du Lịch Nhật Bản"
     *                       type: "esim"
     *                       status: "active"
     *                       image_url: "https://example.com/image.jpg"
     *                       slug: "sim-du-lich-nhat-ban"
     *                       created_at: "2024-03-17T00:00:00.000Z"
     *                       updated_at: "2024-03-17T00:00:00.000Z"
     *                       variants:
     *                         - product_sku: "JP-10GB-7DAYS"
     *                           plan_type: "daily"
     *                           name: "Gói 10GB - 7 Ngày"
     *                           status: "active"
     *                       categories:
     *                         - guid: "uuid-category-1"
     *                           code: "JP"
     *                           name: "Nhật Bản"
     *                           country_mcc: "440"
     *                           parent: null
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.get(
        "/search",
        validateRequest(searchSiteProductSchema, ["query"]),
        siteProductController.searchProducts
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/option-prices/{product_sku}:
     *   get:
     *     summary: Lấy giá của các option theo SKU
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: path
     *         name: product_sku
     *         required: true
     *         schema:
     *           type: string
     *         description: Product SKU
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Lấy danh sách mức giá thành công"
     *                 data:
     *                   - product_sku: "JP-10GB-7DAYS"
     *                     copies: 1
     *                     original_price: 250000
     *                     final_price: 200000
     *                     currency: "CNY"
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.get(
        "/option-prices/:product_sku",
        validateRequest(getOptionPriceSchema, ["params"]),
        siteProductController.getOptionPricesBySku
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/variants-by-discount/{discount_guid}:
     *   get:
     *     summary: Lấy danh sách option được gán giảm giá
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: path
     *         name: discount_guid
     *         required: true
     *         schema:
     *           type: string
     *         description: GUID của mã giảm giá
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Lấy danh sách option theo mã giảm giá thành công"
     *                 data:
     *                   - product_sku: "JP-10GB-7DAYS"
     *                     name: "Gói 10GB - 7 Ngày"
     *                     options:
     *                       - copies: 1
     *                         price_id: 10
     *                         retail_price: 250000
     *                         original_price: 250000
     *                         final_price: 200000
     *                         currency: "CNY"
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.get(
        "/variants-by-discount/:discount_guid",
        validateRequest(searchVariantsByDiscountSchema, ["params"]),
        siteProductController.getVariantsByDiscount
    );

    return router;
})();

export { siteProductRouter };
