import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  HOST: str(),
  PORT: num(),
  CORS_ORIGIN: str(),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num(),
  COMMON_RATE_LIMIT_WINDOW_MS: num(),
  DB_HOST: str(),
  DB_NAME: str(),
  DB_PORT: num(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  MAILER_HOST: str(),
  MAILER_PORT: num(),
  MAILER_USER: str(),
  MAILER_PASSWORD: str(),
  FRONTEND_DSP_DOMAIN: str(),
  SECRET_KEY_AES_GCM: str(),
  S3_ACCESS_KEY: str(),
  S3_ACCESS_SECRET: str(),
  S3_BUCKETS_NAME: str(),
  KEYCLOAK_URL: str(),
  KEYCLOAK_REALM: str(),
  KEYCLOAK_ADMIN_CLIENT_ID: str(),
  KEYCLOAK_ADMIN_USERNAME: str(),
  KEYCLOAK_ADMIN_PASSWORD: str(),
  PASSRORD_PUBLISHER_DEFAULT: str(),
  REDIS_HOST: str(),
  REDIS_PASSWORD: str(),
  REDIS_PORT: num(),
  JWT_SECRET_KEY: str(),
  KONG_DOMAIN: str(),
  DSP_DOMAIN: str(),
  JWT_SECRET_KEY_HASH_PASS_PUBLISHER: str(),
  REDIS_FREQUENCE_CAP_DB: num(),
  CLOUDINARY_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str()
});
