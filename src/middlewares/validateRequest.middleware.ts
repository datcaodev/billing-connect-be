import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ServiceResponse } from "../types";
import { handleServiceResponse } from "../utils";
import { ValidationError } from "../utils/errors/ValidationError.error";

function tryParseJSON(value: any) {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeBody(body: any) {
  const result: any = {};

  for (const key in body) {
    result[key] = tryParseJSON(body[key]);
  }

  return result;
}

export const validateRequestWithForm =
  (schema: ZodSchema, types: ("body" | "query" | "params")[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (types.includes("body")) {
          req.body = normalizeBody(req.body);
        }

        const dataToValidate =
          types.length === 1
            ? req[types[0]]
            : types.reduce((acc, type) => ({ ...acc, ...req[type] }), {});

        schema.parse(dataToValidate);

        next();
      } catch (err) {
        console.log(err);

        const errorMessage = `${(err as ZodError)?.errors?.[0]?.message}`;
        const errorMapping = new ValidationError(errorMessage);

        const serviceResponse = ServiceResponse.failure({
          message: errorMapping.message,
          error_code: errorMapping.error_code,
        });

        return handleServiceResponse(serviceResponse, res);
      }
    };

export const validateRequest =
  (schema: ZodSchema, types: ("body" | "query" | "params")[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (types.includes("body")) {
          req.body = req.body;
        }

        const dataToValidate =
          types.length === 1
            ? req[types[0]]
            : types.reduce((acc, type) => ({ ...acc, ...req[type] }), {});

        schema.parse(dataToValidate);

        next();
      } catch (err) {
        console.log(err);

        const errorMessage = `${(err as ZodError)?.errors?.[0]?.message}`;
        const errorMapping = new ValidationError(errorMessage);

        const serviceResponse = ServiceResponse.failure({
          message: errorMapping.message,
          error_code: errorMapping.error_code,
        });

        return handleServiceResponse(serviceResponse, res);
      }
    };