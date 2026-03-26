"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServiceResponseImagePixel = exports.handleServiceResponseRedirect = exports.handleServiceResponse = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleServiceResponse = (serviceResponse, response) => {
    const { responseCode } = serviceResponse, pickDataResponse = __rest(serviceResponse, ["responseCode"]);
    return response.status(responseCode).send(pickDataResponse);
};
exports.handleServiceResponse = handleServiceResponse;
const handleServiceResponseRedirect = (response, url) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    return response.status(200).send(`
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
exports.handleServiceResponseRedirect = handleServiceResponseRedirect;
const handleServiceResponseImagePixel = (response, bufferImage) => {
    response.setHeader("Content-Type", "image/gif");
    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("Expires", "0");
    return response.status(200).send(bufferImage);
};
exports.handleServiceResponseImagePixel = handleServiceResponseImagePixel;
//# sourceMappingURL=httpHandlers.utils.js.map