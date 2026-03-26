"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHeaderService = void 0;
require("express"); // Bắt buộc để mở rộng type
const ValidationError_error_1 = require("../utils/errors/ValidationError.error");
const utils_1 = require("../utils");
const types_1 = require("../types");
// Middleware validate clientId và mapping client secret
const checkHeaderService = async (req, res, next) => {
    try {
        const clientId = req.token_decode.azp;
        if (!clientId) {
            const errorMapping = new ValidationError_error_1.ValidationError("Không tìm thấy client-id");
            return (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
                error_code: errorMapping.error_code,
                message: errorMapping.message,
                code: errorMapping.code
            }), res);
        }
        // const clientSecretDecrypt = decryptAESGCM({
        //   authTag: serviceInfo.auth_tag,
        //   cipherText: serviceInfo.client_secret,
        //   iv: serviceInfo.iv
        // });
        // req.client = {
        //   clientId: serviceInfo.client_id || null,
        //   clientSecret: clientSecretDecrypt || null,
        //   code: serviceInfo.code || null,
        //   clientUuid: serviceInfo.client_uuid || null
        // }
        next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (error) {
        const fallbackError = new ValidationError_error_1.ValidationError("Lỗi khi xác thực Dịch vụ");
        return (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
            error_code: fallbackError.error_code,
            message: fallbackError.message,
            code: fallbackError.code
        }), res);
    }
};
exports.checkHeaderService = checkHeaderService;
//# sourceMappingURL=checkHeaderService.middleware.js.map