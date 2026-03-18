import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const searchBillionProductSchema = z.object({
    keyword: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'keyword' phải là String",
    }).optional(),
    skuId: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'skuId' phải là String",
    }).optional(),
    name: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).optional(),
    country: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'country' phải là String",
    }).optional(),
}).merge(basePaginationRequestSchema);

export const getBillionProductDetailSchema = z.object({
    skuId: z.string({
        required_error: "Thiếu 'skuId'",
        invalid_type_error: "'skuId' phải là String",
    }),
});
