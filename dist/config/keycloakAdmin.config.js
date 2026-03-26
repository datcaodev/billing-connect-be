"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakClientSingleton = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const keycloak_admin_client_cjs_1 = require("@s3pweb/keycloak-admin-client-cjs");
const utils_1 = require("../utils");
const sever_config_1 = require("./sever.config");
class KeycloakClientSingleton {
    constructor() { }
    static async authenticate() {
        var _a;
        const response = await this.instance.auth({
            username: utils_1.env.KEYCLOAK_ADMIN_USERNAME,
            password: utils_1.env.KEYCLOAK_ADMIN_PASSWORD,
            grantType: "password",
            clientId: utils_1.env.KEYCLOAK_ADMIN_CLIENT_ID,
        });
        const now = Date.now();
        const expiresIn = (_a = response === null || response === void 0 ? void 0 : response.expires_in) !== null && _a !== void 0 ? _a : 60;
        this.tokenExpiresAt = now + (expiresIn - 10) * 1000;
        sever_config_1.logger.info("Keycloak authenticated");
    }
    static async getInstance() {
        if (!this.instance) {
            this.instance = new keycloak_admin_client_cjs_1.KeycloakAdminClient({
                baseUrl: utils_1.env.KEYCLOAK_URL,
                realmName: utils_1.env.KEYCLOAK_REALM,
            });
            await this.authenticate();
        }
        else {
            const now = Date.now();
            const tokenValid = this.instance.accessToken && now < this.tokenExpiresAt;
            if (!tokenValid) {
                sever_config_1.logger.info("Refreshing Keycloak token...");
                await this.authenticate();
            }
        }
        return this.instance;
    }
}
exports.KeycloakClientSingleton = KeycloakClientSingleton;
KeycloakClientSingleton.tokenExpiresAt = 0;
//# sourceMappingURL=keycloakAdmin.config.js.map