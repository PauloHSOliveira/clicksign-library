import { AxiosResponse } from 'axios';
import { ClickSignEnvironment, GetDocumentsApiResponse } from '../../types';
import { ClickSignAPI } from '../api/ClickSignAPI';
import {
  CreateDocumentByTemplateResponse,
  GetDocumentResponse,
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
      console.log(error)
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

  async getDocument(key: string): Promise<GetDocumentResponse> {
    try {
      const response: AxiosResponse<GetDocumentResponse> = await this.api
        .getApi()
        .get(`/documents/${key}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch document from ClickSign API.');
    }
  }

  async cancelDocument(key: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api
        .getApi()
        .patch(`/documents/${key}/cancel`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to cancel document from ClickSign API.');
    }
  }

  async deleteDocument(key: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api
        .getApi()
        .delete(`/documents/${key}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to delete document from ClickSign API.');
    }
  }
}
