import { StatusCodes } from "http-status-codes";
import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class AuthenticationError extends AppError {
  constructor(message = "Xác thực thất bại", error_code = "UNAUTHORIZED") {
    super({
      message,
      code: ErrorCode.UNAUTHORIZED,
      error_code,
      headerStatusCode: StatusCodes.UNAUTHORIZED
    });
  }
}
