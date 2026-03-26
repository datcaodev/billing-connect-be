"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupNamingFormulaEmployee = exports.getPagination = exports.generateRandomPassword = exports.BadResponse = exports.bcryptCompare = exports.bcryptHashValue = void 0;
exports.getGmailUsername = getGmailUsername;
exports.stringToBoolean = stringToBoolean;
exports.validateAccountStatus = validateAccountStatus;
exports.validateUUID = validateUUID;
exports.encodeBase64 = encodeBase64;
exports.decodeBase64 = decodeBase64;
exports.renderPlanName = renderPlanName;
const bcrypt_1 = __importDefault(require("bcrypt"));
const httpHandlers_utils_1 = require("./httpHandlers.utils");
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const app_config_1 = require("../config/app.config");
const common_enum_1 = require("../enums/common.enum");
const bcryptHashValue = (value) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(value, salt);
};
exports.bcryptHashValue = bcryptHashValue;
const bcryptCompare = (valueReal, valueHash) => {
    return bcrypt_1.default.compareSync(valueReal, valueHash);
};
exports.bcryptCompare = bcryptCompare;
// common response bad response
const BadResponse = (res, error) => {
    return (0, httpHandlers_utils_1.handleServiceResponse)(serviceResponse_core_1.ServiceResponse.failure({
        message: error || "Gặp lỗi xảy ra trong quá trình xử lý. Vui lòng kiểm tra lại"
    }), res);
};
exports.BadResponse = BadResponse;
const generateRandomPassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + digits + specialChars;
    // Random password length between 10 and 13
    const length = Math.floor(Math.random() * 4) + 10;
    let password = '';
    // Ensure at least one character from each type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    // Shuffle the password to randomize the guaranteed characters
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password;
};
exports.generateRandomPassword = generateRandomPassword;
// convert kiểu dữ liệu phân trang đầu vào
const getPagination = (params) => {
    try {
        const { page, size, sortBy } = params;
        const parsePage = +page + 1 || app_config_1.APP_CONFIG.pageDefault;
        const parseSize = +size || app_config_1.APP_CONFIG.limitDefault;
        const offset = (parsePage - 1) * parseSize;
        const limit = parseSize;
        const sortByMapping = sortBy === 'ASC' ? 'ASC' : 'DESC';
        return { skip: offset, take: limit, orderBy: sortByMapping };
    }
    catch (error) {
        return error;
    }
};
exports.getPagination = getPagination;
function getGmailUsername(email) {
    if (typeof email !== 'string')
        return '';
    const parts = email.split('@');
    return parts[0] || '';
}
// tạo tên nhóm quyền nhân viên keycloak
const groupNamingFormulaEmployee = (params) => {
    const { taxCode, nameGroup } = params;
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    return `Employee_${nameGroup}_${taxCode}_${randomNumber}`;
};
exports.groupNamingFormulaEmployee = groupNamingFormulaEmployee;
function stringToBoolean(value) {
    if (value === null || value === undefined) {
        return null; // Trả về null nếu giá trị là null hoặc undefined
    }
    // Chuyển đổi chuỗi 'true' thành true và chuỗi 'false' thành false
    if (value.toLowerCase() === 'true') {
        return true;
    }
    else if (value.toLowerCase() === 'false') {
        return false;
    }
    // Nếu giá trị không phải 'true' hoặc 'false', trả về null
    return null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateAccountStatus(value) {
    return Object.values(common_enum_1.STATUS_COMMON).includes(value) ? value : undefined;
}
// validate uuid
function validateUUID(value) {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof value === 'string' && uuidV4Regex.test(value) ? value : undefined;
}
// Hàm encode JSON object thành Base64
function encodeBase64(obj) {
    const jsonString = JSON.stringify(obj);
    return Buffer.from(jsonString).toString('base64');
}
// Hàm decode Base64 thành JSON object
function decodeBase64(base64Str) {
    const jsonString = Buffer.from(base64Str, 'base64').toString('utf-8');
    return JSON.parse(jsonString);
}
function renderPlanName(high_flow_size, plan_type) {
    const size = Number(high_flow_size);
    // Không giới hạn
    if (size === -1) {
        return "UNLIMITED";
    }
    const mb = size / 1024;
    let value;
    let unit;
    if (mb < 1024) {
        // Làm tròn xuống hàng trăm MB
        value = Math.floor(mb / 100) * 100;
        unit = "MB";
    }
    else {
        const gb = mb / 1024;
        value = Math.round(gb * 10) / 10;
        unit = "GB";
    }
    return Number(plan_type) === 1
        ? `${value}${unit}/ngày`
        : `${value}${unit}`;
}
//# sourceMappingURL=function.utils.js.map