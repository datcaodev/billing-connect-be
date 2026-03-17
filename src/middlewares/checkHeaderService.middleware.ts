import { NextFunction, Request, Response } from "express";
import "express"; // Bắt buộc để mở rộng type
import { ValidationError } from "../utils/errors/ValidationError.error";
import { handleServiceResponse } from "../utils";
import { ServiceResponse } from "../types";
import { serviceTypeRepository } from "../repositories";

// Middleware validate clientId và mapping client secret
export const checkHeaderService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = req.token_decode.azp;

    if (!clientId) {
      const errorMapping = new ValidationError("Không tìm thấy client-id");
      return handleServiceResponse(
        ServiceResponse.failure({
          error_code: errorMapping.error_code,
          message: errorMapping.message,
          code: errorMapping.code
        }),
        res
      );
    }

    const serviceInfo = await serviceTypeRepository.findServiceTypeByClientId({ clientId });
    if (!serviceInfo) {
      const errorMapping = new ValidationError(
        "Không tìm thấy dịch vụ. Vui lòng kiểm tra lại"
      );
      return handleServiceResponse(
        ServiceResponse.failure({
          error_code: errorMapping.error_code,
          message: errorMapping.message,
          code: errorMapping.code
        }),
        res
      );
    }

    // const clientSecretDecrypt = decryptAESGCM({
    //   authTag: serviceInfo.auth_tag,
    //   cipherText: serviceInfo.client_secret,
    //   iv: serviceInfo.iv
    // });


    // req.client = {
    //   clientId: serviceInfo.client_id || null,
    //   clientSecret: clientSecretDecrypt || null,
    //   code: serviceInfo.code || null,
    //   clientUuid: serviceInfo.client_uuid || null
    // }

    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    const fallbackError = new ValidationError("Lỗi khi xác thực Dịch vụ");
    return handleServiceResponse(
      ServiceResponse.failure({
        error_code: fallbackError.error_code,
        message: fallbackError.message,
        code: fallbackError.code
      }),
      res
    );
  }
};
