import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { TEXT_CONSTANT } from "../constants/text_constant";
import { IServiceResponseParams } from "../types/response.type";
import { ErrorCode } from "../enums";
import { SuccessCode } from "../enums/success.enum";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly description: string;
  readonly data: T;
  readonly error_code: string;
  readonly code: SuccessCode | ErrorCode; // mã code ở data response
  readonly responseCode: StatusCodes; // mã code ở header
  readonly timestamp: number; // timestamp

  private constructor(success: boolean, message: string, data: T, code: number, responseCode: number, timestamp: number, error_code: string | null) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error_code = error_code;
    this.code = code;
    this.description = 'Message is init response'
    this.responseCode = responseCode;
    this.timestamp = timestamp;

  }

  static success<T>(params: IServiceResponseParams<T>) {
    const {
      data = null,
      message = TEXT_CONSTANT.SUCCESS,
      code = SuccessCode.CODE_SUCCESS_200,
      error_code = null,
      headerStatusCode = StatusCodes.OK
    } = params
    const timestamp = Date.now();
    return new ServiceResponse(true, message, data, code, headerStatusCode, timestamp, error_code);
  }

  static successAndNotify<T>(params: IServiceResponseParams<T>) {
    const {
      data = null,
      message = TEXT_CONSTANT.SUCCESS,
      code = SuccessCode.CODE_SUCCESS_NOTIFY_201,
      error_code = null,
      headerStatusCode = StatusCodes.OK
    } = params
    const timestamp = Date.now();
    return new ServiceResponse(true, message, data, code, headerStatusCode, timestamp, error_code);
  }

  static warningAndNotify<T>(params: IServiceResponseParams<T>) {
    const {
      data = null,
      message = TEXT_CONSTANT.SUCCESS,
      code = SuccessCode.CODE_WARNING_NOTIFY,
      error_code = null,
      headerStatusCode = StatusCodes.OK
    } = params
    const timestamp = Date.now();
    return new ServiceResponse(true, message, data, code, headerStatusCode, timestamp, error_code);
  }


  static failure<T>(params: IServiceResponseParams<T>) {
    const {
      data = null,
      message = TEXT_CONSTANT.NOT_SUCCESS,
      code = ErrorCode.ACTION_FAILED,
      error_code = null,
      headerStatusCode = StatusCodes.OK
    } = params
    const timestamp = Date.now();
    return new ServiceResponse(false, message, data, code, headerStatusCode, timestamp, error_code);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema.optional(),
    code: z.number(),
    responseCode: z.number(),
  });

