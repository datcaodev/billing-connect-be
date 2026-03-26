"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgencyPackagePriceSchema = exports.getAgencyPackagesAllQuerySchema = exports.getAgencyPackagesFilterQuerySchema = exports.getAgencyPackagesQuerySchema = exports.agencyGuidParamSchema = exports.agencyPriceSchema = void 0;
const zod_1 = require("zod");
const formula_enum_1 = require("../enums/formula.enum");
exports.agencyPriceSchema = zod_1.z.object({
    agencyGuid: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'agencyGuid'",
        invalid_type_error: "Sai kiểu dữ liệu: 'agencyGuid' phải là String",
    }).uuid("agencyGuid không hợp lệ"),
    formula: zod_1.z.nativeEnum(formula_enum_1.PriceAdjustType, {
        required_error: "Thiếu tham số bắt buộc: 'formula'",
        invalid_type_error: "Sai kiểu dữ liệu: 'formula' không hợp lệ",
    }),
    amount: zod_1.z.number({
        invalid_type_error: "Sai kiểu dữ liệu: 'amount' phải là Number",
    }).optional(),
    remark: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'remark' phải là String",
    }).optional(),
    packages: zod_1.z.array(zod_1.z.object({
        skuId: zod_1.z.string(),
        type: zod_1.z.string(),
        name: zod_1.z.string(),
        highFlowSize: zod_1.z.string().nullable(),
        planType: zod_1.z.string().nullable(),
        prices: zod_1.z.array(zod_1.z.object({
            productSku: zod_1.z.string(),
            copies: zod_1.z.string(),
            retailPrice: zod_1.z.string(),
            settlementPrice: zod_1.z.string(),
        })),
    })).min(1, "Danh sách gói không được để trống"),
});
const pagination_schema_1 = require("./pagination.schema");
exports.agencyGuidParamSchema = zod_1.z.object({
    agencyGuid: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'agencyGuid'",
    }).uuid("guid đại lý không hợp lệ"),
});
exports.getAgencyPackagesQuerySchema = pagination_schema_1.basePaginationRequestSchema.extend({
    productSku: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
});
exports.getAgencyPackagesFilterQuerySchema = pagination_schema_1.basePaginationRequestSchema.extend({
    productSku: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    countryMcc: zod_1.z.preprocess((val) => {
        if (typeof val === "string")
            return val.split(",").map(v => v.trim()).filter(v => v !== "");
        return val;
    }, zod_1.z.array(zod_1.z.string())).optional(),
    areaName: zod_1.z.string().optional(),
});
exports.getAgencyPackagesAllQuerySchema = zod_1.z.object({
    productSku: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
});
exports.updateAgencyPackagePriceSchema = zod_1.z.object({
    agencyGuid: zod_1.z.string().uuid("agencyGuid không hợp lệ"),
    copiesGuid: zod_1.z.string().uuid("copiesGuid không hợp lệ"),
    price: zod_1.z.number({
        required_error: "Thiếu giá cập nhật",
        invalid_type_error: "Giá phải là số",
    }).min(0, "Giá không được nhỏ hơn 0"),
});
//# sourceMappingURL=agencyPrice.schema.js.map