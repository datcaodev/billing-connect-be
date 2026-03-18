import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const searchBillionProductSchema = z.object({
    skuId: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'skuId' phải là String",
    }).optional(),
    name: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).optional(),
}).merge(basePaginationRequestSchema);

export type ISearchBillionProduct = z.infer<typeof searchBillionProductSchema>;

export const getBillionProductDetailSchema = z.object({
    skuId: z.string({
        required_error: "Thiếu 'skuId'",
        invalid_type_error: "'skuId' phải là String",
    }),
});
