import { AxiosResponse } from 'axios';
import { ClickSignEnvironment, GetDocumentsApiResponse } from '../../types';
import { ClickSignAPI } from '../api/ClickSignAPI';
import {
  CreateDocumentByTemplateResponse,
  TemplateDocument,
} from '../../types/documents';

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

  async createDocumentByTemplate(
    templateData: TemplateDocument,
  ): Promise<CreateDocumentByTemplateResponse> {
    try {
      const response: AxiosResponse = await this.api
        .getApi()
        .post(`/templates/${templateData.templateKey}/documents`, {
          document: {
            path: templateData.path,
            template: {
              data: {
                ...templateData.data,
              },
            },
          },
        });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create document on ClickSign API.');
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
