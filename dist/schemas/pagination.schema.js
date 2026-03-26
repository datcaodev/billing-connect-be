"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePaginationQuerySchema = exports.basePaginationRequestSchema = void 0;
const zod_1 = require("zod");
exports.basePaginationRequestSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    sortBy: zod_1.z.string().optional(),
});
exports.basePaginationQuerySchema = zod_1.z.object({
    content: zod_1.z.array((0, zod_1.any)()),
    total: zod_1.z.number(),
});
//# sourceMappingURL=pagination.schema.js.map