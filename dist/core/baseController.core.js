"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const serviceResponse_core_1 = require("./serviceResponse.core");
const httpHandlers_utils_1 = require("../utils/httpHandlers.utils");
const AppError_error_1 = require("../utils/errors/AppError.error");
const NotFoundError_error_1 = require("../utils/errors/NotFoundError.error");
class BaseController {
    async handleWithTryCatch(handler, res, next) {
        try {
            const result = await handler();
            return (0, httpHandlers_utils_1.handleServiceResponse)(result, res);
        }
        catch (error) {
            if (error instanceof AppError_error_1.AppError) {
                return (0, httpHandlers_utils_1.handleServiceResponse)(serviceResponse_core_1.ServiceResponse.failure({
                    message: error.message,
                    code: error.code,
                    error_code: error.error_code,
                    headerStatusCode: error.headerStatusCode
                }), res);
            }
            next(error);
            // return BadResponse(res);
        }
    }
    async handleWithTryCatchRedirectResponse(handler, res, next) {
        try {
            const result = await handler();
            // nếu có url
            if (!result)
                throw new NotFoundError_error_1.NotFoundError("url không hợp lệ");
            return (0, httpHandlers_utils_1.handleServiceResponseRedirect)(res, result);
        }
        catch (error) {
            if (error instanceof AppError_error_1.AppError) {
                return (0, httpHandlers_utils_1.handleServiceResponse)(serviceResponse_core_1.ServiceResponse.failure({
                    message: error.message,
                    code: error.code,
                    error_code: error.error_code,
                    headerStatusCode: error.headerStatusCode
                }), res);
            }
            next(error);
            // return BadResponse(res);
        }
    }
    async handleWithTryCatchRedirectResponseImageBuffer(handler, res, next) {
        try {
            const result = await handler();
            return (0, httpHandlers_utils_1.handleServiceResponseImagePixel)(res, result);
        }
        catch (error) {
            if (error instanceof AppError_error_1.AppError) {
                return (0, httpHandlers_utils_1.handleServiceResponse)(serviceResponse_core_1.ServiceResponse.failure({
                    message: error.message,
                    code: error.code,
                    error_code: error.error_code,
                    headerStatusCode: error.headerStatusCode
                }), res);
            }
            next(error);
            // return BadResponse(res);
        }
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.core.js.map