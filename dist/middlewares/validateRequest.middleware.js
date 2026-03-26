"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.validateRequestWithForm = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
const ValidationError_error_1 = require("../utils/errors/ValidationError.error");
function tryParseJSON(value) {
    if (typeof value !== "string")
        return value;
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
}
function normalizeBody(body) {
    const result = {};
    for (const key in body) {
        result[key] = tryParseJSON(body[key]);
    }
    return result;
}
const validateRequestWithForm = (schema, types) => (req, res, next) => {
    var _a, _b;
    try {
        if (types.includes("body")) {
            req.body = normalizeBody(req.body);
        }
        const dataToValidate = types.length === 1
            ? req[types[0]]
            : types.reduce((acc, type) => (Object.assign(Object.assign({}, acc), req[type])), {});
        schema.parse(dataToValidate);
        next();
    }
    catch (err) {
        console.log(err);
        const errorMessage = `${(_b = (_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message}`;
        const errorMapping = new ValidationError_error_1.ValidationError(errorMessage);
        const serviceResponse = types_1.ServiceResponse.failure({
            message: errorMapping.message,
            error_code: errorMapping.error_code,
        });
        return (0, utils_1.handleServiceResponse)(serviceResponse, res);
    }
};
exports.validateRequestWithForm = validateRequestWithForm;
const validateRequest = (schema, types) => (req, res, next) => {
    var _a, _b;
    try {
        if (types.includes("body")) {
            req.body = req.body;
        }
        const dataToValidate = types.length === 1
            ? req[types[0]]
            : types.reduce((acc, type) => (Object.assign(Object.assign({}, acc), req[type])), {});
        schema.parse(dataToValidate);
        next();
    }
    catch (err) {
        console.log(err);
        const errorMessage = `${(_b = (_a = err === null || err === void 0 ? void 0 : err.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message}`;
        const errorMapping = new ValidationError_error_1.ValidationError(errorMessage);
        const serviceResponse = types_1.ServiceResponse.failure({
            message: errorMapping.message,
            error_code: errorMapping.error_code,
        });
        return (0, utils_1.handleServiceResponse)(serviceResponse, res);
    }
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.middleware.js.map