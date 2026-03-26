"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class ConflictError extends AppError_error_1.AppError {
    constructor(message = "Xung đột dữ liệu", error_code = "DATA_CONFLICT") {
        super({
            message,
            code: enums_1.ErrorCode.DATA_CONFLICT,
            error_code,
        });
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=ConflictError.error.js.map