/* eslint-disable @typescript-eslint/no-explicit-any */
// middlewares/error.middleware.ts
import { NextFunction, Request, Response } from "express";
import { handleServiceResponse } from "../utils";
import { ServiceResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/sever.config";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const message = err || "Đã xảy ra lỗi không xác định";
  const errors = err?.errors || null;

  console.log(err);

  logger.error(`[ERROR] ${req.method} ${req.originalUrl}: Error message: ${message} | ${errors}`);

  handleServiceResponse(ServiceResponse.failure({
    message: "Gặp lỗi trong quá trình xử lý. Vui lòng thử lại sau",
    headerStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    code: 400
  }), res);
};

