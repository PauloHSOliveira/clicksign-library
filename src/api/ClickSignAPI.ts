import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import RateLimit from 'axios-rate-limit';
import { ClickSignEnvironment } from '../../types';

export class ClickSignAPI {
  private static instance: ClickSignAPI | null = null;
  private api: AxiosInstance | null = null;

  private constructor(apiKey: string, environment: ClickSignEnvironment) {
    this.api = this.createAxiosInstance(apiKey, environment);
  }

  static getInstance(
    apiKey: string,
    environment: ClickSignEnvironment,
  ): ClickSignAPI {
    if (!ClickSignAPI.instance) {
      ClickSignAPI.instance = new ClickSignAPI(apiKey, environment);
    }
    return ClickSignAPI.instance;
  }

  private createAxiosInstance(
    apiKey: string,
    environment: ClickSignEnvironment,
    retry: boolean = false,
  ): AxiosInstance {
    const baseURL =
      environment === ClickSignEnvironment.Production
        ? 'https://api.clicksign.com/api/v1'
        : 'https://sandbox.clicksign.com/api/v1';

    // Criar um AxiosInstance com rate limiting
    const instance = axios.create({
      baseURL,
      params: {
        access_token: apiKey,
      },
    });

    const rateLimitedInstance = RateLimit(instance, {
      maxRequests: 10,
      perMilliseconds: 2000,
    });

    if (retry) {
      axiosRetry(rateLimitedInstance, { retries: 3 });
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
