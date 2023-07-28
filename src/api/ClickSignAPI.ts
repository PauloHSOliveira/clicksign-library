import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ClickSignEnvironment, GetDocumentsApiResponse } from '../types';

export class ClickSignAPI {
  private api: AxiosInstance;

  constructor(apiKey: string, environment: ClickSignEnvironment) {
    this.api = this.createAxiosInstance(apiKey, environment);
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

  async createDocumentByTemplate(): Promise<any> {
    try {
      const response: AxiosResponse = await this.api.get('/documents');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch documents from ClickSign API.');
    }
  }

  async getDocuments(): Promise<GetDocumentsApiResponse> {
    try {
      const response: AxiosResponse<GetDocumentsApiResponse> =
        await this.api.get('/documents');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch documents from ClickSign API.');
    }
  }

  // Add more methods as needed for other API endpoints.
}
