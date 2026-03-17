/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { AuthenticationError } from "../utils/errors/AuthenticationError.error";
import { handleServiceResponse } from "../utils";
import { AuthenticatedRequest, ServiceResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/errors/AppError.error";
import { ITokenPayload } from "../types/token.type";
import { isEmpty } from "lodash";
import { AuthorizationError } from "../utils/errors/AuthorizationError.error";

export function keycloakProtect(requiredRole?: string) {
  return async function(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new AuthenticationError("Vui lòng đăng nhập");
      return handleServiceResponse(
        ServiceResponse.failure({
          message: error.message,
          code: error.code,
          error_code: error.error_code,
          headerStatusCode: StatusCodes.UNAUTHORIZED
        }),
        res
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded: ITokenPayload = jwtDecode(token);


      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        throw new AuthenticationError("Token đã hết hạn");
      }

      // Check role
      if (requiredRole) {
        const roles = decoded?.resource_access?.[decoded?.azp]?.roles || [];
        if (!roles.includes(requiredRole) || isEmpty(roles)) {
          const error = new AuthorizationError("Bạn không có quyền truy cập chức năng này");
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
      }

      req.token_info = decoded;
      req.user_guid = decoded.sub;
      next();
    } catch (err: any) {
      if (err instanceof AppError) {
        return handleServiceResponse(
          ServiceResponse.failure({
            message: err.message,
            code: err.code,
            error_code: err.error_code,
            headerStatusCode: StatusCodes.UNAUTHORIZED
          }),
          res
        );
      }
      const message = err?.message?.toLowerCase() || "";

      const error = new AuthenticationError(
        message.includes("expired")
          ? "Token đã hết hạn"
          : "Token không hợp lệ"
      );

      return handleServiceResponse(
        ServiceResponse.failure({
          message: error.message,
          code: error.code,
          error_code: error.error_code,
          headerStatusCode: StatusCodes.UNAUTHORIZED
        }),
        res
      );
    }
  };
}