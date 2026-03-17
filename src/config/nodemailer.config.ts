import nodemailer from "nodemailer";
import { env } from "../utils/envConfig.utils";

const { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASSWORD } = env;
export const mailTransporter = nodemailer.createTransport({
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