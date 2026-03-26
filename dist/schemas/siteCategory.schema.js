"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountrySchema = exports.updateAreaSchema = exports.getAreasAllSchema = exports.getAreasSchema = exports.getCountriesByAreaSchema = exports.getCountriesSchema = exports.createCountrySchema = exports.createAreaSchema = void 0;
const zod_1 = require("zod");
const pagination_schema_1 = require("./pagination.schema");
exports.createAreaSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Tên khu vực không được để trống",
        invalid_type_error: "Tên khu vực phải là chuỗi",
    }).min(1, "Tên khu vực không được để trống"),
    code: zod_1.z.string({
        required_error: "Mã khu vực không được để trống",
        invalid_type_error: "Mã khu vực phải là chuỗi",
    }).min(1, "Mã khu vực không được để trống"),
    position: zod_1.z.number({
        invalid_type_error: "Thứ tự ưu tiên phải là số",
    }).optional(),
});
exports.createCountrySchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Tên quốc gia không được để trống",
        invalid_type_error: "Tên quốc gia phải là chuỗi",
    }).min(1, "Tên quốc gia không được để trống"),
    code: zod_1.z.string({
        required_error: "Mã quốc gia không được để trống",
        invalid_type_error: "Mã quốc gia phải là chuỗi",
    }).min(1, "Mã quốc gia không được để trống"),
    areaGuid: zod_1.z.string({
        required_error: "GUID khu vực (Area) không được để trống",
        invalid_type_error: "GUID khu vực phải là chuỗi",
    }).min(1, "GUID khu vực không được để trống").uuid("GUID khu vực không hợp lệ"),
    position: zod_1.z.number({
        invalid_type_error: "Thứ tự ưu tiên phải là số",
    }).optional(),
});
exports.getCountriesSchema = pagination_schema_1.basePaginationRequestSchema.extend({
    name: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
});
exports.getCountriesByAreaSchema = zod_1.z.object({
    areaGuid: zod_1.z.string().uuid("GUID khu vực không hợp lệ").optional(),
});
exports.getAreasSchema = pagination_schema_1.basePaginationRequestSchema.extend({
    name: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
});
exports.getAreasAllSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
});
exports.updateAreaSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    position: zod_1.z.number().optional(),
});
exports.updateCountrySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    position: zod_1.z.number().optional(),
    areaGuid: zod_1.z.string().optional(),
});
//# sourceMappingURL=siteCategory.schema.js.map