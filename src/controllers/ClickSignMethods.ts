import { AxiosResponse } from 'axios';
import { ClickSignEnvironment, GetDocumentsApiResponse } from '../../types';
import { ClickSignAPI } from '../api/ClickSignAPI';

export class ClickSignMethods {
  private api: ClickSignAPI;

  private constructor(apiKey: string, environment: ClickSignEnvironment) {
    this.api = ClickSignAPI.getInstance(apiKey, environment);
  }

  static getInstance(
    apiKey: string,
    environment: ClickSignEnvironment,
  ): ClickSignMethods {
    return new ClickSignMethods(apiKey, environment);
  }

  async createDocumentByTemplate(): Promise<any> {
    try {
      const response: AxiosResponse = await this.api.getApi().get('/documents');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch documents from ClickSign API.');
    }
  }

  async getDocuments(): Promise<GetDocumentsApiResponse> {
    try {
      const response: AxiosResponse<GetDocumentsApiResponse> = await this.api
        .getApi()
        .get('/documents');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch documents from ClickSign API.');
    }
  }

  // Add more methods as needed for other API endpoints.
}
