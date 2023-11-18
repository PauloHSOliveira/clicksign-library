import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import RateLimit from 'axios-rate-limit';
import { ClickSignEnvironment } from '../types';
import { ApiInstanceTypes } from '../types/apiInstance';
import { isArray } from 'lodash';

type ErrorResponse = {
  code?: number;
  errors?: string | string[];
};

class ClickSignError extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super(`ClickSign API Error (Code: ${code}): ${message}`);
    this.code = code;
    this.message = message;
  }
}
export class ClickSignAPI {
  private static instance: ClickSignAPI | null = null;
  private api: AxiosInstance | null = null;

  public handleErrorResponse(error: AxiosError): never {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data as ErrorResponse;
      const errorStatus = error.response?.status;
      if (responseData && responseData.errors) {
        const errorCode = errorStatus || 500;
        let errorMessage = '';

        if (isArray(responseData.errors)) {
          errorMessage = responseData.errors.join(', ');
        } else {
          errorMessage = responseData.errors as string;
        }

        throw new ClickSignError(errorCode, errorMessage);
      }
    }
    throw error;
  }

  private constructor({
    apiKey,
    environment,
    maxRequests = 10,
    perMilliseconds = 2000,
    retryConfig = { retries: 3 },
    debug = false,
  }: ApiInstanceTypes) {
    this.api = this.createAxiosInstance({
      apiKey,
      environment,
      maxRequests,
      perMilliseconds,
      retryConfig,
      debug,
    });
  }

  static getInstance({
    apiKey,
    environment,
    maxRequests = 10,
    perMilliseconds = 2000,
    retryConfig = { retries: 3 },
    debug = false,
  }: ApiInstanceTypes): ClickSignAPI {
    if (!ClickSignAPI.instance) {
      ClickSignAPI.instance = new ClickSignAPI({
        apiKey,
        environment,
        maxRequests,
        perMilliseconds,
        retryConfig,
        debug,
      });
    }
    return ClickSignAPI.instance;
  }

  private createAxiosInstance({
    apiKey,
    environment,
    maxRequests,
    perMilliseconds,
    retryConfig,
    debug = false,
  }: ApiInstanceTypes): AxiosInstance {
    const baseURL =
      environment === ClickSignEnvironment.Production
        ? 'https://api.clicksign.com/api/v1'
        : 'https://sandbox.clicksign.com/api/v1';

    const instance = axios.create({
      baseURL,
      params: {
        access_token: apiKey,
      },
    });

    const rateLimitedInstance = RateLimit(instance, {
      maxRequests,
      perMilliseconds,
    });

    if (debug) {
      rateLimitedInstance.interceptors.request.use((config) => {
        console.log(`Making request to ${config.url}`);
        return config;
      });
    }

    if (retryConfig) {
      axiosRetry(rateLimitedInstance, retryConfig);
    }

    rateLimitedInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleErrorResponse(error);
      },
    );

    if (debug) {
      console.log('Rate limiting and retry applied.');
    }

    return rateLimitedInstance;
  }

  getApi(): AxiosInstance {
    if (!this.api) {
      throw new Error(
        'ClickSign API instance is not set. Call getInstance() before using.',
      );
    }
    return this.api;
  }
}
