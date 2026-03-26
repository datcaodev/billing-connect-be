"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAgencySchema = exports.updateAgencySchema = exports.createAgencySchema = void 0;
const zod_1 = require("zod");
exports.createAgencySchema = zod_1.z.object({
    code: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'code'",
        invalid_type_error: "Sai kiểu dữ liệu: 'code' phải là String",
    }).max(100, "Mã đại lý không được vượt quá 100 ký tự"),
    name: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).max(255, "Tên đại lý không được vượt quá 255 ký tự"),
    email: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'email'",
        invalid_type_error: "Sai kiểu dữ liệu: 'email' phải là String",
    }).email("Email không hợp lệ").max(255, "Email không được vượt quá 255 ký tự"),
    phone: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'phone'",
        invalid_type_error: "Sai kiểu dữ liệu: 'phone' phải là String",
    }).max(255, "Số điện thoại không được vượt quá 255 ký tự"),
    address: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'address' phải là String",
    }).max(255, "Địa chỉ không được vượt quá 255 ký tự").nullable(),
    website: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'website' phải là String",
    }).max(255, "Website không được vượt quá 255 ký tự").nullable(),
});
exports.updateAgencySchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).max(255, "Tên đại lý không được vượt quá 255 ký tự").optional(),
    email: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'email' phải là String",
    }).email("Email không hợp lệ").max(255, "Email không được vượt quá 255 ký tự").optional(),
    phone: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'phone' phải là String",
    }).max(255, "Số điện thoại không được vượt quá 255 ký tự").optional(),
    address: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'address' phải là String",
    }).max(255, "Địa chỉ không được vượt quá 255 ký tự").nullable().optional(),
    website: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'website' phải là String",
    }).max(255, "Website không được vượt quá 255 ký tự").nullable().optional(),
});
const pagination_schema_1 = require("./pagination.schema");
exports.searchAgencySchema = zod_1.z.object({
    code: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'code' phải là String",
    }).optional(),
    name: zod_1.z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).optional(),
}).merge(pagination_schema_1.basePaginationRequestSchema);
//# sourceMappingURL=agency.schema.js.map