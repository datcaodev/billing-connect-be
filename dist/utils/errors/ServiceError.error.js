"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class ServiceUnavailableError extends AppError_error_1.AppError {
    constructor(message = "Lỗi khi gọi sang service khác", error_code = "SERVICE_ERROR") {
        super({ message, code: enums_1.ErrorCode.SERVICE_ERROR, error_code });
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=ServiceError.error.js.map