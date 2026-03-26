"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetailsSchema = exports.searchOrderSchema = void 0;
const zod_1 = require("zod");
const pagination_schema_1 = require("./pagination.schema");
exports.searchOrderSchema = pagination_schema_1.basePaginationRequestSchema.extend({
    transactionId: zod_1.z.string().optional(),
    orderId: zod_1.z.string().optional(),
    paymentStatus: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
});
exports.getOrderDetailsSchema = zod_1.z.object({
    orderId: zod_1.z.string({
        required_error: "Thiếu tham số 'orderId'",
    }).min(1, "orderId không được để trống"),
});
//# sourceMappingURL=order.schema.js.map