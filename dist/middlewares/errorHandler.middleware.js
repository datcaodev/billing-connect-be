"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../utils");
const types_1 = require("../types");
const http_status_codes_1 = require("http-status-codes");
const sever_config_1 = require("../config/sever.config");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, _next) => {
    const message = err || "Đã xảy ra lỗi không xác định";
    const errors = (err === null || err === void 0 ? void 0 : err.errors) || null;
    console.log(err);
    sever_config_1.logger.error(`[ERROR] ${req.method} ${req.originalUrl}: Error message: ${message} | ${errors}`);
    (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
        message: "Gặp lỗi trong quá trình xử lý. Vui lòng thử lại sau",
        headerStatusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        code: 400
    }), res);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map