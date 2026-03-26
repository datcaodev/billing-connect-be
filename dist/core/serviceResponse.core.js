"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponseSchema = exports.ServiceResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const text_constant_1 = require("../constants/text_constant");
const enums_1 = require("../enums");
const success_enum_1 = require("../enums/success.enum");
class ServiceResponse {
    constructor(success, message, data, code, responseCode, timestamp, error_code) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error_code = error_code;
        this.code = code;
        this.description = 'Message is init response';
        this.responseCode = responseCode;
        this.timestamp = timestamp;
    }
    static success(params) {
        const { data = null, message = text_constant_1.TEXT_CONSTANT.SUCCESS, code = success_enum_1.SuccessCode.CODE_SUCCESS_200, error_code = null, headerStatusCode = http_status_codes_1.StatusCodes.OK } = params;
        const timestamp = Date.now();
        return new ServiceResponse(true, message, data, code, headerStatusCode, timestamp, error_code);
    }
    static successAndNotify(params) {
        const { data = null, message = text_constant_1.TEXT_CONSTANT.SUCCESS, code = success_enum_1.SuccessCode.CODE_SUCCESS_NOTIFY_201, error_code = null, headerStatusCode = http_status_codes_1.StatusCodes.OK } = params;
        const timestamp = Date.now();
        return new ServiceResponse(true, message, data, code, headerStatusCode, timestamp, error_code);
    }
    static warningAndNotify(params) {
        const { data = null, message = text_constant_1.TEXT_CONSTANT.SUCCESS, code = success_enum_1.SuccessCode.CODE_WARNING_NOTIFY, error_code = null, headerStatusCode = http_status_codes_1.StatusCodes.OK } = params;
        const timestamp = Date.now();
        return new ServiceResponse(true, message, data, code, headerStatusCode, timestamp, error_code);
    }
    static failure(params) {
        const { data = null, message = text_constant_1.TEXT_CONSTANT.NOT_SUCCESS, code = enums_1.ErrorCode.ACTION_FAILED, error_code = null, headerStatusCode = http_status_codes_1.StatusCodes.OK } = params;
        const timestamp = Date.now();
        return new ServiceResponse(false, message, data, code, headerStatusCode, timestamp, error_code);
    }
}
exports.ServiceResponse = ServiceResponse;
const ServiceResponseSchema = (dataSchema) => zod_1.z.object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string(),
    data: dataSchema.optional(),
    code: zod_1.z.number(),
    responseCode: zod_1.z.number(),
});
exports.ServiceResponseSchema = ServiceResponseSchema;
//# sourceMappingURL=serviceResponse.core.js.map