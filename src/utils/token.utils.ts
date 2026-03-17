import jwt from "jsonwebtoken";

export const verifyTokenActiveAccountAsync = <T>(
  token: string,
  secret: string
): T | void => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw "Liên kết xác thực tài khoản đã hết hạn. Vui lòng kiểm tra lại";
      } else if (err.name === "JsonWebTokenError") {
        throw "Token không hợp lệ.";
      }
      throw "Lỗi xác minh token.";
    }
    return decoded;
  });
};
