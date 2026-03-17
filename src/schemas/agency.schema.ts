import { z } from "zod";

export const createAgencySchema = z.object({
    code: z.string({
        required_error: "Thiếu tham số bắt buộc: 'code'",
        invalid_type_error: "Sai kiểu dữ liệu: 'code' phải là String",
    }).max(100, "Mã đại lý không được vượt quá 100 ký tự"),
    name: z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).max(255, "Tên đại lý không được vượt quá 255 ký tự"),
    email: z.string({
        required_error: "Thiếu tham số bắt buộc: 'email'",
        invalid_type_error: "Sai kiểu dữ liệu: 'email' phải là String",
    }).email("Email không hợp lệ").max(255, "Email không được vượt quá 255 ký tự"),
    phone: z.string({
        required_error: "Thiếu tham số bắt buộc: 'phone'",
        invalid_type_error: "Sai kiểu dữ liệu: 'phone' phải là String",
    }).max(255, "Số điện thoại không được vượt quá 255 ký tự"),
    address: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'address' phải là String",
    }).max(255, "Địa chỉ không được vượt quá 255 ký tự").nullable(),
    website: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'website' phải là String",
    }).max(255, "Website không được vượt quá 255 ký tự").nullable(),
});

export const updateAgencySchema = z.object({
    name: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).max(255, "Tên đại lý không được vượt quá 255 ký tự").optional(),
    email: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'email' phải là String",
    }).email("Email không hợp lệ").max(255, "Email không được vượt quá 255 ký tự").optional(),
    phone: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'phone' phải là String",
    }).max(255, "Số điện thoại không được vượt quá 255 ký tự").optional(),
    address: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'address' phải là String",
    }).max(255, "Địa chỉ không được vượt quá 255 ký tự").nullable().optional(),
    website: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'website' phải là String",
    }).max(255, "Website không được vượt quá 255 ký tự").nullable().optional(),
});

import { basePaginationRequestSchema } from "./pagination.schema";

export const searchAgencySchema = z.object({
    code: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'code' phải là String",
    }).optional(),
    name: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).optional(),
}).merge(basePaginationRequestSchema);
