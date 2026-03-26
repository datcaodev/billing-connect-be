"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class ValidationError extends AppError_error_1.AppError {
    constructor(message = "Dữ liệu đầu vào không hợp lệ", error_code = "VALIDATION_ERROR") {
        super({
            message,
            code: enums_1.ErrorCode.VALIDATION_ERROR,
            error_code
        });
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.error.js.map