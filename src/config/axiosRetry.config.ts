// retryAxios.ts

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axiosRetry from 'axios-retry';
import { logger } from "./sever.config";

class RetryAxiosSingleton {
  private static instances: Record<string, AxiosInstance> = {};

  static getInstance(baseURL: string): AxiosInstance {
    if (!this.instances[baseURL]) {
      const instance = axios.create({baseURL, timeout: 10000});

      axiosRetry(instance, {
        retries: 3,
        shouldResetTimeout: true, // bắt buộc cho timeout method POST
        retryDelay: () =>  0,
        retryCondition: error => {
          return (
            axiosRetry.isNetworkOrIdempotentRequestError(error) || // lỗi giao thức mạng
            error.code === 'ECONNABORTED' || // lỗi timeout
            (error.response && error.response.status >= 500) // lỗi server > 500
          );
        },
        onRetry: (retryCount: number, error: AxiosError, requestConfig: AxiosRequestConfig) => {
          logger.error(error);
          logger.warn(`Retrying #${retryCount} to api: ${requestConfig.url} `);
        }
      });

      this.instances[baseURL] = instance;
    }

    return this.instances[baseURL];
  }
}

export default RetryAxiosSingleton;
