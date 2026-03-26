"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envConfig_utils_1 = require("../utils/envConfig.utils");
const { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASSWORD } = envConfig_utils_1.env;
exports.mailTransporter = nodemailer_1.default.createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    secure: false,
    auth: {
        user: MAILER_USER,
        pass: MAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=nodemailer.config.js.map