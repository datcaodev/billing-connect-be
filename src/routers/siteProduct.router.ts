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
     *               desc:
     *                 type: string
     *               image:
     *                 type: string
     *                 format: binary
     *               category_guids:
     *                 type: array
     *                 items:
     *                   type: string
     *               area_guid:
     *                 type: string
     *               variants:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     product_sku:
     *                       type: string
     *                     name:
     *                       type: string
     *                     options:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           copies:
     *                             type: number
     *                           discount_guid:
     *                             type: string
     *     responses:
     *       200:
     *         description: Thành công
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
     */
    router.get(
        "/variants-by-discount/:discount_guid",
        validateRequest(searchVariantsByDiscountSchema, ["params"]),
        siteProductController.getVariantsByDiscount
    );

    return router;
})();

export { siteProductRouter };
