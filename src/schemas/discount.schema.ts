import { z } from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DiscountType } from "../enums/discountType.enum";
import { DiscountStatus } from "../enums/discountStatus.enum";
import { basePaginationRequestSchema } from "./pagination.schema";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY HH:mm:ss";

export const createDiscountSchema = z.object({
    name: z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).min(1, "Tên giảm giá không được để trống"),
    type: z.nativeEnum(DiscountType, {
        required_error: "Thiếu tham số bắt buộc: 'type'",
        invalid_type_error: "Sai kiểu dữ liệu: 'type' phải là PERCENTAGE hoặc FIXED",
    }),
    value: z.number({
        required_error: "Thiếu tham số bắt buộc: 'value'",
        invalid_type_error: "Sai kiểu dữ liệu: 'value' phải là Number",
    }).positive("Giá trị giảm giá phải lớn hơn 0"),
    startDate: z.string({
        required_error: "Thiếu tham số bắt buộc: 'startDate'",
    }).refine((date) => dayjs(date, dateFormat, true).isValid(), {
        message: `startDate không đúng định dạng ${dateFormat}`,
    }),
    endDate: z.string({
        required_error: "Thiếu tham số bắt buộc: 'endDate'",
    }).refine((date) => dayjs(date, dateFormat, true).isValid(), {
        message: `endDate không đúng định dạng ${dateFormat}`,
    }),
}).refine((data) => {
    const start = dayjs(data.startDate, dateFormat);
    const end = dayjs(data.endDate, dateFormat);
    return start.isBefore(end) || start.isSame(end);
}, {
    message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
    path: ["endDate"],
});

export type ICreateDiscountRequest = z.infer<typeof createDiscountSchema>;

export const searchDiscountSchema = basePaginationRequestSchema.extend({
    guid: z.string().optional(),
    status: z.nativeEnum(DiscountStatus).optional(),
});

export type ISearchDiscountRequest = z.infer<typeof searchDiscountSchema>;

export const searchDiscountAllSchema = z.object({
    guid: z.string().optional(),
    status: z.nativeEnum(DiscountStatus).optional(),
});

export type ISearchDiscountAllRequest = z.infer<typeof searchDiscountAllSchema>;
