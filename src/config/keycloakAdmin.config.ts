/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeycloakAdminClient } from "@s3pweb/keycloak-admin-client-cjs";
import { env } from "../utils";
import { logger } from "./sever.config";

export class KeycloakClientSingleton {
  private static instance: KeycloakAdminClient;
  private static tokenExpiresAt = 0;

  private constructor() {}

  private static async authenticate(): Promise<void> {
    const response = await this.instance.auth({
      username: env.KEYCLOAK_ADMIN_USERNAME,
      password: env.KEYCLOAK_ADMIN_PASSWORD,
      grantType: "password",
      clientId: env.KEYCLOAK_ADMIN_CLIENT_ID,
    });

    const now = Date.now();
    const expiresIn = (response as any)?.expires_in ?? 60;
    this.tokenExpiresAt = now + (expiresIn - 10) * 1000;

    logger.info("Keycloak authenticated");
  }

  public static async getInstance(): Promise<KeycloakAdminClient> {
    if (!this.instance) {
      this.instance = new KeycloakAdminClient({
        baseUrl: env.KEYCLOAK_URL,
        realmName: env.KEYCLOAK_REALM,
      });

      await this.authenticate();
    } else {
      const now = Date.now();
      const tokenValid = this.instance.accessToken && now < this.tokenExpiresAt;
      if (!tokenValid) {
        logger.info("Refreshing Keycloak token...");
        await this.authenticate();
      }
    }

    return this.instance;
  }
}
