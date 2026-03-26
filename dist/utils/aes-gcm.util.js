"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptAESGCM = encryptAESGCM;
exports.decryptAESGCM = decryptAESGCM;
const crypto_1 = __importDefault(require("crypto"));
const envConfig_utils_1 = require("./envConfig.utils");
// Giải mã từ base64 thay vì hex
const SECRET_KEY = Buffer.from(envConfig_utils_1.env.SECRET_KEY_AES_GCM, "base64");
function encryptAESGCM(plainText, key = SECRET_KEY) {
    const iv = crypto_1.default.randomBytes(12); // 96-bit IV
    const cipher = crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([
        cipher.update(plainText, "utf8"),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    return {
        cipherText: encrypted.toString("hex"),
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
    };
}
function decryptAESGCM({ cipherText, iv, authTag }, key = SECRET_KEY) {
    const decipher = crypto_1.default.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
    decipher.setAuthTag(Buffer.from(authTag, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(cipherText, "hex")),
        decipher.final(),
    ]);
    return decrypted.toString("utf8");
}
//# sourceMappingURL=aes-gcm.util.js.map