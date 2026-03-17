import session from "express-session";
import Keycloak from "keycloak-connect";
// import { handleServiceResponse } from "../utils";
// import { ServiceResponse } from "../types";
// import { AuthenticationError } from "../utils/errors/AuthenticationError.error";
// import { StatusCodes } from "http-status-codes";
// import { Request, Response } from "express";
// import { AuthorizationError } from "../utils/errors/AuthorizationError.error";

export class KeycloakSingleton {
  private static instance: KeycloakSingleton;
  private keycloak: Keycloak.Keycloak;
  private memoryStore: session.MemoryStore;

  private constructor() {
    this.memoryStore = new session.MemoryStore();

    this.keycloak = new Keycloak({ store: this.memoryStore });

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

  public static getInstance(): KeycloakSingleton {
    if (!KeycloakSingleton.instance) {
      KeycloakSingleton.instance = new KeycloakSingleton();
    }
    return KeycloakSingleton.instance;
  }

  public getKeycloak(): Keycloak.Keycloak {
    return this.keycloak;
  }

  public getStore(): session.MemoryStore {
    return this.memoryStore;
  }
}

export function getClientSecret(clientId: string): string | null {
  const envKey = `CLIENT_SECRET_${clientId.toUpperCase().replace(/-/g, "_")}`;
  return process.env[envKey] || null;
}
