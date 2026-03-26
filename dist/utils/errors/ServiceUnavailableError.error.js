"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class ServiceUnavailableError extends AppError_error_1.AppError {
    constructor(message = "Dịch vụ tạm thời không sẵn sàng", error_code = "SERVICE_UNAVAILABLE") {
        super({ message, code: enums_1.ErrorCode.SERVICE_UNAVAILABLE, error_code });
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=ServiceUnavailableError.error.js.map