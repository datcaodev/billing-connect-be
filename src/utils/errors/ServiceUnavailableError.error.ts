import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class ServiceUnavailableError extends AppError {
    constructor(message = "Dịch vụ tạm thời không sẵn sàng", error_code = "SERVICE_UNAVAILABLE") {
      super({message, code: ErrorCode.SERVICE_UNAVAILABLE, error_code});
    }
  }