"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vietnamTimeTransformer = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
exports.vietnamTimeTransformer = {
    to(value) {
        // Trước khi lưu → lấy giờ VN và gán thẳng
        const formatted = (0, dayjs_1.default)(value).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
        return new Date(formatted);
    },
    from(value) {
        // Khi lấy ra → giữ nguyên, không shift về UTC
        return (0, dayjs_1.default)(value).tz("Asia/Ho_Chi_Minh").toDate();
    }
};
//# sourceMappingURL=vietnamTimeTransformer.util.js.map