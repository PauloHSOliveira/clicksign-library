export enum ClickSignEnvironment {
  Production = 'production',
  Sandbox = 'sandbox',
}

export interface ClickSignOptions {
  accessToken: string;
  environment: ClickSignEnvironment;
}

export interface ApiInstanceTypes {
  apiKey: string;
  environment: ClickSignEnvironment;
  maxRequests?: number;
  perMilliseconds?: number;
  retryConfig?: any;
  debug?: boolean;
}
