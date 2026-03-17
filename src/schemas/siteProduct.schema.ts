import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const siteProductSchema = z.object({
    name: z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).min(1, "Tên sản phẩm không được để trống"),
    desc: z.string().nullable(),
    image_url: z.string().nullable().optional(),
    category_guids: z.array(z.string()).min(1, "Sản phẩm phải thuộc ít nhất một danh mục"),
    area_guid: z.string().nullable(),
    variants: z.array(z.object({
        product_sku: z.string({
            required_error: "Thiếu tham số bắt buộc: 'product_sku'",
        }),
        name: z.string({
            required_error: "Thiếu tham số bắt buộc: 'name' cho biến thể",
        }),
        options: z.array(z.object({
            copies: z.number({
                required_error: "Thiếu tham số bắt buộc: 'copies'",
            }),
            discount_guid: z.string().nullable(),
        })).min(1, "Biến thể phải có ít nhất một giá trị (copies)"),
    })).min(1, "Sản phẩm phải có ít nhất một gói")
});

export type ISiteProductRequest = z.infer<typeof siteProductSchema>;

export const searchSiteProductSchema = basePaginationRequestSchema.extend({
    sku_id: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    category_code: z.string().optional(),
    category_name: z.string().optional()
});

export const getOptionPriceSchema = z.object({
    product_sku: z.string({
        required_error: "Thiếu tham số 'product_sku'",
    }).min(1, "product_sku không được để trống"),
});

export const searchVariantsByDiscountSchema = z.object({
    discount_guid: z.string({
        required_error: "Thiếu tham số 'discount_guid'",
    }).uuid("GUID không hợp lệ"),
});

export type ISearchVariantsByDiscountRequest = z.infer<typeof searchVariantsByDiscountSchema>;
