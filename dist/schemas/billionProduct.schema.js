"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBillionProductDetailSchema = exports.searchBillionProductSchema = void 0;
const zod_1 = require("zod");
const pagination_schema_1 = require("./pagination.schema");
exports.searchBillionProductSchema = zod_1.z.object({
    skuId: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'skuId' phải là String",
    }).optional(),
    name: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).optional(),
}).merge(pagination_schema_1.basePaginationRequestSchema);
exports.getBillionProductDetailSchema = zod_1.z.object({
    skuId: zod_1.z.string({
        required_error: "Thiếu 'skuId'",
        invalid_type_error: "'skuId' phải là String",
    }),
});
//# sourceMappingURL=billionProduct.schema.js.map