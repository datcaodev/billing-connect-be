"use strict";
// export enum ErrorCode {
//     FORBIDDEN = 403, // Không có quyền truy cập
//     UNAUTHORIZED = 401, // Xác thực thất bại
//     DATA_CONFLICT = 409, // sung đột dữ liêuj
//     GATEWAY_TIMEOUT = 504, // Sever timeout
//     SERVER_ERROR = 500, // lỗi máy chủ
//     NOT_FOUND = 404, // Không tìm thấy tài nguyên
//     SERVICE_UNAVAILABLE = 503, // Dịch vụ tạm thời không sẵn sàng
//     VALIDATION_ERROR = 400 // Dữ liệu đầu vào không hợp lệ
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    // ✅ Xác thực & phân quyền
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    // ✅ Lỗi nghiệp vụ / thao tác không thành công
    ErrorCode[ErrorCode["VALIDATION_ERROR"] = 400] = "VALIDATION_ERROR";
    ErrorCode[ErrorCode["DATA_CONFLICT"] = 409] = "DATA_CONFLICT";
    ErrorCode[ErrorCode["BUSINESS_REJECTED"] = 422] = "BUSINESS_REJECTED";
    ErrorCode[ErrorCode["ACTION_FAILED"] = 417] = "ACTION_FAILED";
    // ✅ Tài nguyên
    ErrorCode[ErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    // ✅ Lỗi hệ thống
    ErrorCode[ErrorCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    ErrorCode[ErrorCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    ErrorCode[ErrorCode["SERVICE_ERROR"] = 505] = "SERVICE_ERROR";
    ErrorCode[ErrorCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=error.enum.js.map