import { ClickSignAPI } from '../api/ClickSignAPI';
import {
  ConfigDocument,
  CreateDocumentByTemplateResponse,
  GetDocumentResponse,
  GetDocumentsApiResponse,
  TemplateDocument,
} from '../../types/documents';
import { AxiosResponse } from 'axios';

export class ClickSignDocuments {
  private api: ClickSignAPI;

  constructor(api: ClickSignAPI) {
    this.api = api;
  }

  async createDocumentByTemplate(
    templateData: TemplateDocument,
  ): Promise<CreateDocumentByTemplateResponse> {
    try {
      const response: AxiosResponse<CreateDocumentByTemplateResponse> =
        await this.api
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
      throw new Error(
        `Failed to create document on ClickSign API.\n${error as any}`,
      );
    }
  }

  async configDocument(
    key: string,
    data: ConfigDocument,
  ): Promise<CreateDocumentByTemplateResponse> {
    try {
      const response: AxiosResponse<CreateDocumentByTemplateResponse> =
        await this.api.getApi().patch(`/documents/${key}`, data);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to config document on ClickSign API.\n${error as any}`,
      );
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
