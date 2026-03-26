"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakSingleton = void 0;
exports.getClientSecret = getClientSecret;
const express_session_1 = __importDefault(require("express-session"));
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
// import { handleServiceResponse } from "../utils";
// import { ServiceResponse } from "../types";
// import { AuthenticationError } from "../utils/errors/AuthenticationError.error";
// import { StatusCodes } from "http-status-codes";
// import { Request, Response } from "express";
// import { AuthorizationError } from "../utils/errors/AuthorizationError.error";
class KeycloakSingleton {
    constructor() {
        this.memoryStore = new express_session_1.default.MemoryStore();
        this.keycloak = new keycloak_connect_1.default({ store: this.memoryStore });
        // Override accessDenied
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // (this.keycloak as any).accessDenied = (req: Request, res: Response) => {
        //   const authHeader = req.headers.authorization;
        //   if(!authHeader){
        //     const error = new AuthenticationError("Vui lòng đăng nhập")
        //     return handleServiceResponse(
        //       ServiceResponse.failure({
        //         message: error.message,
        //         code: error.code,
        //         error_code: error.error_code,
        //         headerStatusCode: StatusCodes.UNAUTHORIZED,
        //       }),
        //       res
        //     );
        //   }
        //   const errorCustom = new AuthorizationError("Bạn không có quyền truy cập chức năng này");
        //   return handleServiceResponse(
        //     ServiceResponse.failure({
        //       message: errorCustom.message,
        //       code: errorCustom.code,
        //       error_code: errorCustom.error_code,
        //       headerStatusCode: StatusCodes.FORBIDDEN,
        //     }),
        //     res
        //   );
        // };
    }
    static getInstance() {
        if (!KeycloakSingleton.instance) {
            KeycloakSingleton.instance = new KeycloakSingleton();
        }
        return KeycloakSingleton.instance;
    }
    getKeycloak() {
        return this.keycloak;
    }
    getStore() {
        return this.memoryStore;
    }
}
exports.KeycloakSingleton = KeycloakSingleton;
function getClientSecret(clientId) {
    const envKey = `CLIENT_SECRET_${clientId.toUpperCase().replace(/-/g, "_")}`;
    return process.env[envKey] || null;
}
//# sourceMappingURL=keycloak.config.js.map