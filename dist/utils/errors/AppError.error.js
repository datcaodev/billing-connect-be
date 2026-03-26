"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(params) {
        const { message, code, error_code, headerStatusCode } = params;
        super(message);
        this.name = new.target.name;
        this.code = code;
        this.headerStatusCode = headerStatusCode;
        this.error_code = error_code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.error.js.map