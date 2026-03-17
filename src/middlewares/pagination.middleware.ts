import type { Request, Response, NextFunction } from "express";
import { handleServiceResponse } from "../utils/httpHandlers.utils";
import { ServiceResponse } from "../core/serviceResponse.core";

//* Middleware validate phân trang
export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Chuyển đổi query thành số nguyên
    const page = parseInt(req.query.page as string, 10);
    const size = parseInt(req.query.size as string, 10);

    // Xác định giá trị hợp lệ
    req.query.page = isNaN(page) || page <= 0 ? "1" : String(page);
    req.query.size = isNaN(size) || size <= 0 ? "10" : String(size);
    next();
  } catch {
    return handleServiceResponse(
      ServiceResponse.failure({
        message: 'Thông tin phân trang không hợp lệ'
      }),
      res
    );
  }
};
