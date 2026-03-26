"use strict";
// retryAxios.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const sever_config_1 = require("./sever.config");
class RetryAxiosSingleton {
    static getInstance(baseURL) {
        if (!this.instances[baseURL]) {
            const instance = axios_1.default.create({ baseURL, timeout: 10000 });
            (0, axios_retry_1.default)(instance, {
                retries: 3,
                shouldResetTimeout: true, // bắt buộc cho timeout method POST
                retryDelay: () => 0,
                retryCondition: error => {
                    return (axios_retry_1.default.isNetworkOrIdempotentRequestError(error) || // lỗi giao thức mạng
                        error.code === 'ECONNABORTED' || // lỗi timeout
                        (error.response && error.response.status >= 500) // lỗi server > 500
                    );
                },
                onRetry: (retryCount, error, requestConfig) => {
                    sever_config_1.logger.error(error);
                    sever_config_1.logger.warn(`Retrying #${retryCount} to api: ${requestConfig.url} `);
                }
            });
            this.instances[baseURL] = instance;
        }
        return this.instances[baseURL];
    }
}
RetryAxiosSingleton.instances = {};
exports.default = RetryAxiosSingleton;
//# sourceMappingURL=axiosRetry.config.js.map