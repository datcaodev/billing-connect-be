"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class AuthenticationError extends AppError_error_1.AppError {
    constructor(message = "Xác thực thất bại", error_code = "UNAUTHORIZED") {
        super({
            message,
            code: enums_1.ErrorCode.UNAUTHORIZED,
            error_code,
            headerStatusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED
        });
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=AuthenticationError.error.js.map