// src/clicksign.ts
import axios, { AxiosInstance } from 'axios';

export enum ClickSignEnvironment {
  Production = 'production',
  Sandbox = 'sandbox',
}

interface ClickSignOptions {
  accessToken: string;
  environment: ClickSignEnvironment;
}

export function createClickSignAPI(options: ClickSignOptions): AxiosInstance {
  const baseURL =
    options.environment === ClickSignEnvironment.Production
      ? 'https://api.clicksign.com/api/v1'
      : 'https://sandbox.clicksign.com/api/v1';

  return axios.create({
    baseURL,
    params: {
      access_token: options.accessToken,
    },
  });
}
