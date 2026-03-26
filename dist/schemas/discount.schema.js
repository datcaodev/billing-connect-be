"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDiscountAllSchema = exports.searchDiscountSchema = exports.createDiscountSchema = void 0;
const zod_1 = require("zod");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const discountType_enum_1 = require("../enums/discountType.enum");
const discountStatus_enum_1 = require("../enums/discountStatus.enum");
const pagination_schema_1 = require("./pagination.schema");
dayjs_1.default.extend(customParseFormat_1.default);
const dateFormat = "DD/MM/YYYY HH:mm:ss";
exports.createDiscountSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'name'",
        invalid_type_error: "Sai kiểu dữ liệu: 'name' phải là String",
    }).min(1, "Tên giảm giá không được để trống"),
    type: zod_1.z.nativeEnum(discountType_enum_1.DiscountType, {
        required_error: "Thiếu tham số bắt buộc: 'type'",
        invalid_type_error: "Sai kiểu dữ liệu: 'type' phải là PERCENTAGE hoặc FIXED",
    }),
    value: zod_1.z.number({
        required_error: "Thiếu tham số bắt buộc: 'value'",
        invalid_type_error: "Sai kiểu dữ liệu: 'value' phải là Number",
    }).positive("Giá trị giảm giá phải lớn hơn 0"),
    startDate: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'startDate'",
    }).refine((date) => (0, dayjs_1.default)(date, dateFormat, true).isValid(), {
        message: `startDate không đúng định dạng ${dateFormat}`,
    }),
    endDate: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'endDate'",
    }).refine((date) => (0, dayjs_1.default)(date, dateFormat, true).isValid(), {
        message: `endDate không đúng định dạng ${dateFormat}`,
    }),
}).refine((data) => {
    const start = (0, dayjs_1.default)(data.startDate, dateFormat);
    const end = (0, dayjs_1.default)(data.endDate, dateFormat);
    return start.isBefore(end) || start.isSame(end);
}, {
    message: "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc",
    path: ["endDate"],
});
exports.searchDiscountSchema = pagination_schema_1.basePaginationRequestSchema.extend({
    guid: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(discountStatus_enum_1.DiscountStatus).optional(),
});
exports.searchDiscountAllSchema = zod_1.z.object({
    guid: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(discountStatus_enum_1.DiscountStatus).optional(),
});
//# sourceMappingURL=discount.schema.js.map