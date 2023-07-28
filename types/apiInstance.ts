export enum ClickSignEnvironment {
  Production = 'production',
  Sandbox = 'sandbox',
}

export interface ClickSignOptions {
  accessToken: string;
  environment: ClickSignEnvironment;
}
