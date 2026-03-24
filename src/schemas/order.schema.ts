import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const searchOrderSchema = basePaginationRequestSchema.extend({
    transactionId: z.string().optional(),
    orderId: z.string().optional(),
    paymentStatus: z.string().optional(),
    status: z.string().optional(),
});

export type ISearchOrderRequest = z.infer<typeof searchOrderSchema>;

export const getOrderDetailsSchema = z.object({
    orderId: z.string({
        required_error: "Thiếu tham số 'orderId'",
    }).min(1, "orderId không được để trống"),
});
