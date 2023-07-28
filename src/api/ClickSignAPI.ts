import axios, { AxiosInstance } from 'axios';
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
  ): AxiosInstance {
    const baseURL =
      environment === ClickSignEnvironment.Production
        ? 'https://api.clicksign.com/api/v1'
        : 'https://sandbox.clicksign.com/api/v1';

    return axios.create({
      baseURL,
      params: {
        access_token: apiKey,
      },
    });
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
