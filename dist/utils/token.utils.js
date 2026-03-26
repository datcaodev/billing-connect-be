"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenActiveAccountAsync = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyTokenActiveAccountAsync = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                throw "Liên kết xác thực tài khoản đã hết hạn. Vui lòng kiểm tra lại";
            }
            else if (err.name === "JsonWebTokenError") {
                throw "Token không hợp lệ.";
            }
            throw "Lỗi xác minh token.";
        }
        return decoded;
    });
};
exports.verifyTokenActiveAccountAsync = verifyTokenActiveAccountAsync;
//# sourceMappingURL=token.utils.js.map