import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class ValidationError extends AppError {
  constructor(
    message = "Dữ liệu đầu vào không hợp lệ",
    error_code = "VALIDATION_ERROR"
  ) {
    super({
      message,
      code: ErrorCode.VALIDATION_ERROR,
      error_code
    });
  }
}
