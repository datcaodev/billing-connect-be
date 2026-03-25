import express, { Router } from "express";
import { validateRequest, validateRequestWithForm } from "../middlewares/validateRequest.middleware";
import { siteProductSchema, searchSiteProductSchema, getOptionPriceSchema, searchVariantsByDiscountSchema, removeDiscountFromOptionsSchema, deleteSiteProductSchema, getVariantsAndOptionsSchema } from "../schemas/siteProduct.schema";
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
     *               - categoryGuids
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
     *               imageUrl:
     *                 type: string
     *                 example: "https://example.com/image.jpg"
     *               categoryGuids:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["uuid-category-sim", "uuid-category-japan"]
     *               areaGuid:
     *                 type: string
     *                 example: "uuid-area-asia"
     *               variants:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     productSku:
     *                       type: string
     *                       example: "JP-10GB-7DAYS"
     *                     highFlowSize:
     *                       type: string
     *                       example: "10485760"
     *                     planType:
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
     *                           discountGuid:
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
     *         name: skuId
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
     *         name: categoryCode
     *         schema:
     *           type: string
     *         description: Mã danh mục
     *       - in: query
     *         name: categoryName
     *         schema:
     *           type: string
     *         description: Tên danh mục
     *       - in: query
     *         name: areaGuid
     *         schema:
     *           type: string
     *           format: uuid
     *         description: GUID của khu vực (area)
     *       - in: query
     *         name: countryGuid
     *         schema:
     *           type: string
     *           format: uuid
     *         description: GUID của quốc gia (country)
     *       - in: query
     *         name: fromDate
     *         schema:
     *           type: string
     *           example: "20/03/2024"
     *         description: Tìm từ ngày (Định dạng DD/MM/YYYY)
     *       - in: query
     *         name: toDate
     *         schema:
     *           type: string
     *           example: "25/03/2024"
     *         description: Tìm đến ngày (Định dạng DD/MM/YYYY)
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
     *                       imageUrl: "https://example.com/image.jpg"
     *                       slug: "sim-du-lich-nhat-ban"
     *                       createdAt: "2024-03-17T00:00:00.000Z"
     *                       updatedAt: "2024-03-17T00:00:00.000Z"
     *                       variants:
     *                         - productSku: "JP-10GB-7DAYS"
     *                           planType: "daily"
     *                           name: "Gói 10GB - 7 Ngày"
     *                           status: "active"
     *                       categories:
     *                         - guid: "uuid-category-1"
     *                           code: "JP"
     *                           name: "Nhật Bản"
     *                           countryMcc: "440"
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
     * /api/v1/billion-connect/site-product/option-prices/{productSku}:
     *   get:
     *     summary: Lấy giá của các option theo SKU
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: path
     *         name: productSku
     *         required: true
     *         schema:
     *           type: string
     *         description: Product SKU
     *       - in: query
     *         name: siteProductGuid
     *         schema:
     *           type: string
     *           format: uuid
     *         description: GUID của sản phẩm site (tùy chọn để lấy chính xác options của sản phẩm đó)
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
     *                   - productSku: "JP-10GB-7DAYS"
     *                     copies: 1
     *                     originalPrice: 250000
     *                     finalPrice: 200000
     *                     currency: "CNY"
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.get(
        "/option-prices/:productSku",
        validateRequest(getOptionPriceSchema, ["params"]),
        siteProductController.getOptionPricesBySku
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/variants-by-discount/{discountGuid}:
     *   get:
     *     summary: Lấy danh sách option được gán giảm giá
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: path
     *         name: discountGuid
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
     *                   - productSku: "JP-10GB-7DAYS"
     *                     name: "Gói 10GB - 7 Ngày"
     *                     options:
     *                       - copies: 1
     *                         priceId: 10
     *                         retailPrice: 250000
     *                         originalPrice: 250000
     *                         finalPrice: 200000
     *                         currency: "CNY"
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.get(
        "/variants-by-discount/:discountGuid",
        validateRequest(searchVariantsByDiscountSchema, ["params"]),
        siteProductController.getVariantsByDiscount
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/remove-discount:
     *   patch:
     *     summary: Bỏ giảm giá ra khỏi các copies được chỉ định
     *     tags: [SiteProduct]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - optionPriceGuids
     *             properties:
     *               optionPriceGuids:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: uuid
     *                 description: Danh sách GUID của các option prices cần gỡ bỏ giảm giá
     *                 example: ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"]
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Bỏ giảm giá khỏi các copies thành công"
     *                 data: true
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.patch(
        "/remove-discount",
        validateRequest(removeDiscountFromOptionsSchema, ["body"]),
        siteProductController.removeDiscountFromOptions
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/delete/{guid}:
     *   post:
     *     summary: Xóa sản phẩm site (Soft delete)
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: path
     *         name: guid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: GUID của sản phẩm cần xóa
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Xóa sản phẩm thành công"
     *                 data: true
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.post(
        "/delete/:guid",
        validateRequest(deleteSiteProductSchema, ["params"]),
        siteProductController.deleteSiteProduct
    );

    /**
     * @swagger
     * /api/v1/billion-connect/site-product/variants-and-options/{guid}:
     *   get:
     *     summary: Lấy danh sách variants và options (giá) của sản phẩm theo GUID
     *     tags: [SiteProduct]
     *     parameters:
     *       - in: path
     *         name: guid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: GUID của sản phẩm site
     *     responses:
     *       200:
     *         description: Thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               example:
     *                 success: true
     *                 message: "Lấy danh sách variants và options thành công"
     *                 data:
     *                   - siteProductId: 1
     *                     productSku: "JP-10GB-7DAYS"
     *                     name: "Gói 10GB - 7 Ngày"
     *                     planType: "daily"
     *                     options:
     *                       - guid: "uuid-option-price"
     *                         copies: 1
     *                         retailPrice: 250000
     *                         discount:
     *                           id: 10
     *                           guid: "uuid-discount-10"
     *                           name: "Giảm giá mùa hè"
     *                           type: "PERCENTAGE"
     *                           value: 10
     *                         currency: "CNY"
     *                 error_code: null
     *                 code: 200
     *                 description: "Message is init response"
     *                 responseCode: 200
     *                 timestamp: 1710660000000
     */
    router.get(
        "/variants-and-options/:guid",
        validateRequest(getVariantsAndOptionsSchema, ["params"]),
        siteProductController.getVariantsAndOptions
    );

    return router;
})();

export { siteProductRouter };
