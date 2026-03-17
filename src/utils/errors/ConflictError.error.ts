import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class ConflictError extends AppError {
  constructor(message = "Xung đột dữ liệu", error_code = "DATA_CONFLICT") {
    super({
      message,
      code: ErrorCode.DATA_CONFLICT,
      error_code,
    });
  }
}
