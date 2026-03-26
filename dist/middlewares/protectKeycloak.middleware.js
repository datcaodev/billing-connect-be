"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keycloakProtect = keycloakProtect;
const jwt_decode_1 = require("jwt-decode");
const AuthenticationError_error_1 = require("../utils/errors/AuthenticationError.error");
const utils_1 = require("../utils");
const types_1 = require("../types");
const http_status_codes_1 = require("http-status-codes");
const AppError_error_1 = require("../utils/errors/AppError.error");
const lodash_1 = require("lodash");
const AuthorizationError_error_1 = require("../utils/errors/AuthorizationError.error");
function keycloakProtect(requiredRole) {
    return async function (req, res, next) {
        var _a, _b, _c;
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new AuthenticationError_error_1.AuthenticationError("Vui lòng đăng nhập");
            return (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
                message: error.message,
                code: error.code,
                error_code: error.error_code,
                headerStatusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED
            }), res);
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = (0, jwt_decode_1.jwtDecode)(token);
            // Check expiration
            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < now) {
                throw new AuthenticationError_error_1.AuthenticationError("Token đã hết hạn");
            }
            // Check role
            if (requiredRole) {
                const roles = ((_b = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.resource_access) === null || _a === void 0 ? void 0 : _a[decoded === null || decoded === void 0 ? void 0 : decoded.azp]) === null || _b === void 0 ? void 0 : _b.roles) || [];
                if (!roles.includes(requiredRole) || (0, lodash_1.isEmpty)(roles)) {
                    const error = new AuthorizationError_error_1.AuthorizationError("Bạn không có quyền truy cập chức năng này");
                    return (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
                        message: error.message,
                        code: error.code,
                        error_code: error.error_code,
                        headerStatusCode: error.headerStatusCode
                    }), res);
                }
            }
            req.token_info = decoded;
            req.user_guid = decoded.sub;
            next();
        }
        catch (err) {
            if (err instanceof AppError_error_1.AppError) {
                return (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
                    message: err.message,
                    code: err.code,
                    error_code: err.error_code,
                    headerStatusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED
                }), res);
            }
            const message = ((_c = err === null || err === void 0 ? void 0 : err.message) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || "";
            const error = new AuthenticationError_error_1.AuthenticationError(message.includes("expired")
                ? "Token đã hết hạn"
                : "Token không hợp lệ");
            return (0, utils_1.handleServiceResponse)(types_1.ServiceResponse.failure({
                message: error.message,
                code: error.code,
                error_code: error.error_code,
                headerStatusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED
            }), res);
        }
    };
}
//# sourceMappingURL=protectKeycloak.middleware.js.map