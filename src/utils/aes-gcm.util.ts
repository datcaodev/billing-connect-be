import crypto from "crypto";
import { env } from "./envConfig.utils";

// Giải mã từ base64 thay vì hex
const SECRET_KEY = Buffer.from(env.SECRET_KEY_AES_GCM, "base64");

export interface EncryptedResult {
  cipherText: string;
  iv: string;
  authTag: string;
}

export function encryptAESGCM(
  plainText: string,
  key: Buffer = SECRET_KEY
): EncryptedResult {
  const iv = crypto.randomBytes(12); // 96-bit IV

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
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

export function decryptAESGCM(
  { cipherText, iv, authTag }: EncryptedResult,
  key: Buffer = SECRET_KEY
): string {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(cipherText, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
