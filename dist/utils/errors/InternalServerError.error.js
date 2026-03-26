"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class InternalServerError extends AppError_error_1.AppError {
    constructor(message = "Lỗi máy chủ", error_code = "SERVER_ERROR") {
        super({
            message,
            code: enums_1.ErrorCode.SERVER_ERROR,
            error_code,
        });
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.error.js.map