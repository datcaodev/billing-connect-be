"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envalid_1 = require("envalid");
dotenv_1.default.config();
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    NODE_ENV: (0, envalid_1.str)(),
    HOST: (0, envalid_1.str)(),
    PORT: (0, envalid_1.num)(),
    CORS_ORIGIN: (0, envalid_1.str)(),
    COMMON_RATE_LIMIT_MAX_REQUESTS: (0, envalid_1.num)(),
    COMMON_RATE_LIMIT_WINDOW_MS: (0, envalid_1.num)(),
    DB_HOST: (0, envalid_1.str)(),
    DB_NAME: (0, envalid_1.str)(),
    DB_PORT: (0, envalid_1.num)(),
    DB_USER: (0, envalid_1.str)(),
    DB_PASSWORD: (0, envalid_1.str)(),
    MAILER_HOST: (0, envalid_1.str)(),
    MAILER_PORT: (0, envalid_1.num)(),
    MAILER_USER: (0, envalid_1.str)(),
    MAILER_PASSWORD: (0, envalid_1.str)(),
    FRONTEND_DSP_DOMAIN: (0, envalid_1.str)(),
    SECRET_KEY_AES_GCM: (0, envalid_1.str)(),
    S3_ACCESS_KEY: (0, envalid_1.str)(),
    S3_ACCESS_SECRET: (0, envalid_1.str)(),
    S3_BUCKETS_NAME: (0, envalid_1.str)(),
    KEYCLOAK_URL: (0, envalid_1.str)(),
    KEYCLOAK_REALM: (0, envalid_1.str)(),
    KEYCLOAK_ADMIN_CLIENT_ID: (0, envalid_1.str)(),
    KEYCLOAK_ADMIN_USERNAME: (0, envalid_1.str)(),
    KEYCLOAK_ADMIN_PASSWORD: (0, envalid_1.str)(),
    PASSRORD_PUBLISHER_DEFAULT: (0, envalid_1.str)(),
    REDIS_HOST: (0, envalid_1.str)(),
    REDIS_PASSWORD: (0, envalid_1.str)(),
    REDIS_PORT: (0, envalid_1.num)(),
    JWT_SECRET_KEY: (0, envalid_1.str)(),
    KONG_DOMAIN: (0, envalid_1.str)(),
    DSP_DOMAIN: (0, envalid_1.str)(),
    JWT_SECRET_KEY_HASH_PASS_PUBLISHER: (0, envalid_1.str)(),
    REDIS_FREQUENCE_CAP_DB: (0, envalid_1.num)(),
    CLOUDINARY_NAME: (0, envalid_1.str)(),
    CLOUDINARY_API_KEY: (0, envalid_1.str)(),
    CLOUDINARY_API_SECRET: (0, envalid_1.str)()
});
//# sourceMappingURL=envConfig.utils.js.map