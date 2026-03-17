import type { Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response): any => {
  const { responseCode, ...pickDataResponse } = serviceResponse
  return response.status(responseCode).send(pickDataResponse);
};

export const handleServiceResponseRedirect = (response: Response, url: string): any => {

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  return  response.status(200).send(`
    <!DOCTYPE html>
    <html lang="vi">
      <head>
        <meta http-equiv="refresh" content="0;url=${url}">
        <title>Đang chuyển hướng...</title>
      </head>
      <body>
        <p>Đang chuyển hướng tới <a href="${url}">${url}</a>...</p>
      </body>
    </html>
  `);
};

export const handleServiceResponseImagePixel = (response: Response, bufferImage: Buffer) => {

  response.setHeader("Content-Type", "image/gif");
  response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.setHeader("Pragma", "no-cache");
  response.setHeader("Expires", "0");
  return  response.status(200).send(bufferImage);
};

