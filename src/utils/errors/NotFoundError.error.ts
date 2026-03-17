import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class NotFoundError extends AppError {
    constructor(message = "Không tìm thấy tài nguyên", error_code = "NOT_FOUND") {
      super({
        message, code: ErrorCode.NOT_FOUND, error_code
      });
    }
  }