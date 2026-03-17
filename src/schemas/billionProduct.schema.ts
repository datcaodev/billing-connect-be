import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const searchBillionProductSchema = z.object({
    keyword: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'keyword' phải là String",
    }).optional(),
    sku_id: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'sku_id' phải là String",
    }).optional(),
    name: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).optional(),
    country: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'country' phải là String",
    }).optional(),
}).merge(basePaginationRequestSchema);

export const getBillionProductDetailSchema = z.object({
    sku_id: z.string({
        required_error: "Thiếu 'sku_id'",
        invalid_type_error: "'sku_id' phải là String",
    }),
});
