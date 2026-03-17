import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class InternalServerError extends AppError {
  constructor(message = "Lỗi máy chủ", error_code = "SERVER_ERROR") {
    super({
      message,
      code: ErrorCode.SERVER_ERROR,
      error_code,
    });
  }
}
