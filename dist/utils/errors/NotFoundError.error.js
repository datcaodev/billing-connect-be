"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class NotFoundError extends AppError_error_1.AppError {
    constructor(message = "Không tìm thấy tài nguyên", error_code = "NOT_FOUND") {
        super({
            message, code: enums_1.ErrorCode.NOT_FOUND, error_code
        });
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.error.js.map