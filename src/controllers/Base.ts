import { AxiosResponse } from 'axios';
import { ClickSignEnvironment, GetDocumentsApiResponse } from '../../types';
import { ClickSignAPI } from '../api/ClickSignAPI';

export default class ClickSignMethodsBase {
  private api: ClickSignAPI;

  constructor(apiKey: string, environment: ClickSignEnvironment) {
    this.api = ClickSignAPI.getInstance(apiKey, environment);
  }

  static getInstance(
    apiKey: string,
    environment: ClickSignEnvironment,
  ): ClickSignMethodsBase {
    return new ClickSignMethodsBase(apiKey, environment);
  }

  public getApi(): ClickSignAPI {
    return this.api;
  }
}
