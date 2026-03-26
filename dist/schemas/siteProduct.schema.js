"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSiteProductSchema = exports.getVariantsAndOptionsSchema = exports.deleteSiteProductSchema = exports.removeDiscountFromOptionsSchema = exports.searchVariantsByDiscountSchema = exports.getOptionPriceSchema = exports.searchSiteProductSchema = exports.siteProductSchema = void 0;
const zod_1 = require("zod");
const pagination_schema_1 = require("./pagination.schema");
exports.siteProductSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).min(1, "Tên sản phẩm không được để trống"),
    desc: zod_1.z.string().nullable(),
    imageUrl: zod_1.z.string().nullable().optional(),
    categoryGuids: zod_1.z.array(zod_1.z.string()).min(1, "Sản phẩm phải thuộc ít nhất một danh mục").nullable(),
    areaGuid: zod_1.z.string().nullable(),
    variants: zod_1.z.array(zod_1.z.object({
        productSku: zod_1.z.string({
            required_error: "Thiếu tham số bắt buộc: 'productSku'",
        }),
        highFlowSize: zod_1.z.string(),
        planType: zod_1.z.string(),
        name: zod_1.z.string({
            required_error: "Thiếu tham số bắt buộc: 'name' cho biến thể",
        }),
        options: zod_1.z.array(zod_1.z.object({
            copies: zod_1.z.number({
                required_error: "Thiếu tham số bắt buộc: 'copies'",
            }),
            discountGuid: zod_1.z.string().nullable(),
        })).min(1, "Biến thể phải có ít nhất một giá trị (copies)"),
    })).min(1, "Sản phẩm phải có ít nhất một gói")
});
exports.searchSiteProductSchema = pagination_schema_1.basePaginationRequestSchema.extend({
    skuId: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    categoryCode: zod_1.z.string().optional(),
    categoryName: zod_1.z.string().optional(),
    areaGuid: zod_1.z.string().uuid("areaGuid phải là UUID hợp lệ").optional(),
    countryGuid: zod_1.z.string().uuid("countryGuid phải là UUID hợp lệ").optional(),
    fromDate: zod_1.z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/, "fromDate phải có định dạng DD/MM/YYYY").optional(),
    toDate: zod_1.z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/, "toDate phải có định dạng DD/MM/YYYY").optional()
});
exports.getOptionPriceSchema = zod_1.z.object({
    productSku: zod_1.z.string({
        required_error: "Thiếu tham số 'productSku'",
    }).min(1, "productSku không được để trống"),
    siteProductGuid: zod_1.z.string().uuid("siteProductGuid phải là UUID hợp lệ").optional(),
});
exports.searchVariantsByDiscountSchema = zod_1.z.object({
    discountGuid: zod_1.z.string({
        required_error: "Thiếu tham số 'discountGuid'",
    }).uuid("GUID không hợp lệ"),
});
exports.removeDiscountFromOptionsSchema = zod_1.z.object({
    optionPriceGuids: zod_1.z.array(zod_1.z.string().uuid("Mỗi phần tử phải là UUID hợp lệ"), { required_error: "Thiếu tham số 'optionPriceGuids'" }).min(1, "Phải cung cấp ít nhất một optionPriceGuid"),
});
exports.deleteSiteProductSchema = zod_1.z.object({
    guid: zod_1.z.string({
        required_error: "Thiếu tham số 'guid'",
    }).uuid("GUID sản phẩm không hợp lệ"),
});
exports.getVariantsAndOptionsSchema = zod_1.z.object({
    guid: zod_1.z.string({
        required_error: "Thiếu tham số 'guid'",
    }).uuid("GUID sản phẩm không hợp lệ"),
});
exports.updateSiteProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Tên sản phẩm không được để trống").optional(),
    desc: zod_1.z.string().nullable().optional(),
    variants: zod_1.z.array(zod_1.z.object({
        guid: zod_1.z.string().uuid("GUID biến thể không hợp lệ").optional(),
        productSku: zod_1.z.string({
            required_error: "Thiếu tham số bắt buộc: 'productSku'",
        }),
        highFlowSize: zod_1.z.string().optional(),
        planType: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        options: zod_1.z.array(zod_1.z.object({
            guid: zod_1.z.string().uuid("GUID tùy chọn không hợp lệ").optional(),
            copies: zod_1.z.number({
                required_error: "Thiếu tham số bắt buộc: 'copies'",
            }),
            retail_price: zod_1.z.number().optional(),
            currency: zod_1.z.string().optional(),
            discountGuid: zod_1.z.string().uuid("GUID giảm giá không hợp lệ").nullable().optional(),
        })).optional(),
    })).optional()
});
//# sourceMappingURL=siteProduct.schema.js.map