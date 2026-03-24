import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const searchOrderSchema = basePaginationRequestSchema.extend({
    transactionId: z.string().optional(),
    orderId: z.string().optional(),
    paymentStatus: z.string().optional(),
    status: z.string().optional(),
});

export type ISearchOrderRequest = z.infer<typeof searchOrderSchema>;
