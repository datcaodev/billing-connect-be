import { StatusCodes } from "http-status-codes";
import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class AuthorizationError extends AppError {
    constructor(message = "Không có quyền truy cập", error_code = "FORBIDDEN") {
      super({
        message,
        code: ErrorCode.FORBIDDEN,
        error_code,
        headerStatusCode: StatusCodes.FORBIDDEN
      });
    }
}