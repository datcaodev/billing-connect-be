import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class GatewayTimeoutError extends AppError {
    constructor(message = "Sever timeout", error_code = "GATEWAY_TIMEOUT") {
      super({
        message, 
        code: ErrorCode.GATEWAY_TIMEOUT, 
        error_code
      });
    }
  }