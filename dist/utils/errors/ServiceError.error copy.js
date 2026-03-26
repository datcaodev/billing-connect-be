"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSSPError = exports.ServiceDSPError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class ServiceDSPError extends AppError_error_1.AppError {
    constructor(message = "Lỗi khi giao tiếp với service DSP", error_code = "SERVICE_DSP_ERROR") {
        super({ message, code: enums_1.ErrorCode.SERVICE_ERROR, error_code });
    }
}
exports.ServiceDSPError = ServiceDSPError;
class ServiceSSPError extends AppError_error_1.AppError {
    constructor(message = "Lỗi khi giao tiếp với service SSP", error_code = "SERVICE_SSP_ERROR") {
        super({ message, code: enums_1.ErrorCode.SERVICE_ERROR, error_code });
    }
}
exports.ServiceSSPError = ServiceSSPError;
//# sourceMappingURL=ServiceError.error%20copy.js.map