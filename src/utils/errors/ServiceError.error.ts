import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class ServiceUnavailableError extends AppError {
    constructor(message = "Lỗi khi gọi sang service khác", error_code = "SERVICE_ERROR") {
      super({message, code: ErrorCode.SERVICE_ERROR, error_code});
    }
  }