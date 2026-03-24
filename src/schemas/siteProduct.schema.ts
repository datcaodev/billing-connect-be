import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const siteProductSchema = z.object({
    name: z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).min(1, "Tên sản phẩm không được để trống"),
    desc: z.string().nullable(),
    imageUrl: z.string().nullable().optional(),
    categoryGuids: z.array(z.string()).min(1, "Sản phẩm phải thuộc ít nhất một danh mục"),
    areaGuid: z.string().nullable(),
    variants: z.array(z.object({
        productSku: z.string({
            required_error: "Thiếu tham số bắt buộc: 'productSku'",
        }),
        highFlowSize: z.string(),
        planType: z.string(),
        name: z.string({
            required_error: "Thiếu tham số bắt buộc: 'name' cho biến thể",
        }),
        options: z.array(z.object({
            copies: z.number({
                required_error: "Thiếu tham số bắt buộc: 'copies'",
            }),
            discountGuid: z.string().nullable(),
        })).min(1, "Biến thể phải có ít nhất một giá trị (copies)"),
    })).min(1, "Sản phẩm phải có ít nhất một gói")
});

export type ISiteProductRequest = z.infer<typeof siteProductSchema>;

export const searchSiteProductSchema = basePaginationRequestSchema.extend({
    skuId: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    categoryCode: z.string().optional(),
    categoryName: z.string().optional(),
    areaGuid: z.string().uuid("areaGuid phải là UUID hợp lệ").optional(),
    countryGuid: z.string().uuid("countryGuid phải là UUID hợp lệ").optional(),
    fromDate: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/, "fromDate phải có định dạng DD/MM/YYYY").optional(),
    toDate: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/, "toDate phải có định dạng DD/MM/YYYY").optional()
});

export const getOptionPriceSchema = z.object({
    productSku: z.string({
        required_error: "Thiếu tham số 'productSku'",
    }).min(1, "productSku không được để trống"),
});

export const searchVariantsByDiscountSchema = z.object({
    discountGuid: z.string({
        required_error: "Thiếu tham số 'discountGuid'",
    }).uuid("GUID không hợp lệ"),
});

export type ISearchVariantsByDiscountRequest = z.infer<typeof searchVariantsByDiscountSchema>;

export const removeDiscountFromOptionsSchema = z.object({
    optionPriceGuids: z.array(
        z.string().uuid("Mỗi phần tử phải là UUID hợp lệ"),
        { required_error: "Thiếu tham số 'optionPriceGuids'" }
    ).min(1, "Phải cung cấp ít nhất một optionPriceGuid"),
});

export type IRemoveDiscountFromOptionsRequest = z.infer<typeof removeDiscountFromOptionsSchema>;

export const deleteSiteProductSchema = z.object({
    guid: z.string({
        required_error: "Thiếu tham số 'guid'",
    }).uuid("GUID sản phẩm không hợp lệ"),
});
