"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class AuthorizationError extends AppError_error_1.AppError {
    constructor(message = "Không có quyền truy cập", error_code = "FORBIDDEN") {
        super({
            message,
            code: enums_1.ErrorCode.FORBIDDEN,
            error_code,
            headerStatusCode: http_status_codes_1.StatusCodes.FORBIDDEN
        });
    }
}
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=AuthorizationError.error.js.map