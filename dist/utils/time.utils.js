"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCurrentTime = void 0;
exports.getNowVN = getNowVN;
exports.getCurrentDateYYYYMMDD = getCurrentDateYYYYMMDD;
exports.getSecondsLeftInDay = getSecondsLeftInDay;
// utils/date.util.ts
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const generateCurrentTime = () => {
    return (new Date()).toJSON();
};
exports.generateCurrentTime = generateCurrentTime;
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
/**
 * Lấy thời gian hiện tại theo giờ Việt Nam (GMT+7)
 */
function getNowVN() {
    const formatted = (0, dayjs_1.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
    return new Date(formatted);
}
/**
 * hàm convert thời gian thành định dạng YYYYMMDD
 * @returns {string} ex: 20221012
 */
function getCurrentDateYYYYMMDD() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
}
/**
 * Hàm lấy số giây còn lại trong ngày (tính từ thời điểm hiện tại đến 23:59:59).
 * @returns {number} Số giây còn lại trong ngày.
 */
function getSecondsLeftInDay() {
    const now = new Date();
    // Tạo thời điểm cuối ngày (23:59:59.999)
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    // Tính khoảng cách thời gian (ms → giây)
    const diffMs = endOfDay.getTime() - now.getTime();
    return Math.floor(diffMs / 1000);
}
//# sourceMappingURL=time.utils.js.map