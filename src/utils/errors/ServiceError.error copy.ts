import { ErrorCode } from "../../enums";
import { AppError } from "./AppError.error";

export class ServiceDSPError extends AppError {
    constructor(message = "Lỗi khi giao tiếp với service DSP", error_code = "SERVICE_DSP_ERROR") {
      super({message, code: ErrorCode.SERVICE_ERROR, error_code});
    }
  }

export class ServiceSSPError extends AppError {
    constructor(message = "Lỗi khi giao tiếp với service SSP", error_code = "SERVICE_SSP_ERROR") {
      super({message, code: ErrorCode.SERVICE_ERROR, error_code});
    }
  }