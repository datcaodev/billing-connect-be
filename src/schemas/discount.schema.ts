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
    start_date: z.string({
        required_error: "Thiếu tham số bắt buộc: 'start_date'",
    }).refine((date) => dayjs(date, dateFormat, true).isValid(), {
        message: `start_date không đúng định dạng ${dateFormat}`,
    }),
    end_date: z.string({
        required_error: "Thiếu tham số bắt buộc: 'end_date'",
    }).refine((date) => dayjs(date, dateFormat, true).isValid(), {
        message: `end_date không đúng định dạng ${dateFormat}`,
    }),
}).refine((data) => {
    const start = dayjs(data.start_date, dateFormat);
    const end = dayjs(data.end_date, dateFormat);
    return start.isBefore(end) || start.isSame(end);
}, {
    message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
    path: ["end_date"],
});

export type ICreateDiscountRequest = z.infer<typeof createDiscountSchema>;

export const searchDiscountSchema = basePaginationRequestSchema.extend({
    guid: z.string().optional(),
    status: z.nativeEnum(DiscountStatus).optional(),
});

export type ISearchDiscountRequest = z.infer<typeof searchDiscountSchema>;
