import { z } from "zod";
import { basePaginationRequestSchema } from "./pagination.schema";

export const createAreaSchema = z.object({
    name: z.string({
        required_error: "Tên khu vực không được để trống",
        invalid_type_error: "Tên khu vực phải là chuỗi",
    }).min(1, "Tên khu vực không được để trống"),
    code: z.string({
        required_error: "Mã khu vực không được để trống",
        invalid_type_error: "Mã khu vực phải là chuỗi",
    }).min(1, "Mã khu vực không được để trống"),
    position: z.number({
        invalid_type_error: "Thứ tự ưu tiên phải là số",
    }).optional(),
});

export const createCountrySchema = z.object({
    name: z.string({
        required_error: "Tên quốc gia không được để trống",
        invalid_type_error: "Tên quốc gia phải là chuỗi",
    }).min(1, "Tên quốc gia không được để trống"),
    code: z.string({
        required_error: "Mã quốc gia không được để trống",
        invalid_type_error: "Mã quốc gia phải là chuỗi",
    }).min(1, "Mã quốc gia không được để trống"),
    areaGuid: z.string({
        required_error: "GUID khu vực (Area) không được để trống",
        invalid_type_error: "GUID khu vực phải là chuỗi",
    }).min(1, "GUID khu vực không được để trống").uuid("GUID khu vực không hợp lệ"),
    position: z.number({
        invalid_type_error: "Thứ tự ưu tiên phải là số",
    }).optional(),
});

export const getCountriesSchema = basePaginationRequestSchema.extend({
    name: z.string().optional(),
    code: z.string().optional(),
});

export const getAreasSchema = basePaginationRequestSchema.extend({
    name: z.string().optional(),
    code: z.string().optional(),
});

export const updateAreaSchema = z.object({
    name: z.string().optional(),
    position: z.number().optional(),
});

export const updateCountrySchema = z.object({
    name: z.string().optional(),
    position: z.number().optional(),
    areaGuid: z.string().optional(),
});
