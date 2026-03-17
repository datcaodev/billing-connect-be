import { NextFunction, Response } from "express";
import { ServiceResponse } from "./serviceResponse.core";
import {
  handleServiceResponse,
  handleServiceResponseImagePixel,
  handleServiceResponseRedirect
} from "../utils/httpHandlers.utils";
import { AppError } from "../utils/errors/AppError.error";
import { NotFoundError } from "../utils/errors/NotFoundError.error";
import * as buffer from "node:buffer";

export class BaseController {
  protected async handleWithTryCatch(
    handler: () => Promise<ServiceResponse<unknown>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await handler();
      return handleServiceResponse(result, res);
    } catch (error) {
      if (error instanceof AppError) {
        return handleServiceResponse(
          ServiceResponse.failure({
            message: error.message,
            code: error.code,
            error_code: error.error_code,
            headerStatusCode: error.headerStatusCode
          }),
          res
        );
      }
      next(error);
      // return BadResponse(res);
    }
  }

  protected async handleWithTryCatchRedirectResponse(
    handler: () => Promise<string>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await handler();
      // nếu có url
      if(!result) throw new NotFoundError("url không hợp lệ")

      return handleServiceResponseRedirect(res, result);

    } catch (error) {
      if (error instanceof AppError) {
        return handleServiceResponse(
          ServiceResponse.failure({
            message: error.message,
            code: error.code,
            error_code: error.error_code,
            headerStatusCode: error.headerStatusCode
          }),
          res
        );
      }
      next(error);
      // return BadResponse(res);
    }
  }

  protected async handleWithTryCatchRedirectResponseImageBuffer(
    handler: () => Promise<Buffer>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await handler();

      return handleServiceResponseImagePixel(res, result);

    } catch (error) {
      if (error instanceof AppError) {
        return handleServiceResponse(
          ServiceResponse.failure({
            message: error.message,
            code: error.code,
            error_code: error.error_code,
            headerStatusCode: error.headerStatusCode
          }),
          res
        );
      }
      next(error);
      // return BadResponse(res);
    }
  }
}
