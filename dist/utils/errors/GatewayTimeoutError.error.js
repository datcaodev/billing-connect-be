"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayTimeoutError = void 0;
const enums_1 = require("../../enums");
const AppError_error_1 = require("./AppError.error");
class GatewayTimeoutError extends AppError_error_1.AppError {
    constructor(message = "Sever timeout", error_code = "GATEWAY_TIMEOUT") {
        super({
            message,
            code: enums_1.ErrorCode.GATEWAY_TIMEOUT,
            error_code
        });
    }
}
exports.GatewayTimeoutError = GatewayTimeoutError;
//# sourceMappingURL=GatewayTimeoutError.error.js.map