import { ClickSignAPI } from '../api/ClickSignAPI';
import {
  ConfigDocument,
  CreateDocumentResponse,
  CreateDocumentByUpload,
  GetDocumentResponse,
  GetDocumentsApiResponse,
  TemplateDocument,
  UpdateDocumentResponse,
} from '../types/documents';
import { AxiosError, AxiosResponse } from 'axios';

export class ClickSignDocuments {
  private api: ClickSignAPI;

  constructor(api: ClickSignAPI) {
    this.api = api;
  }

  async createDocumentByTemplate(
    templateData: TemplateDocument,
  ): Promise<CreateDocumentResponse> {
    try {
      const response: AxiosResponse<CreateDocumentResponse> = await this.api
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
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async createDocumentByUpload(
    data: CreateDocumentByUpload,
  ): Promise<CreateDocumentResponse> {
    try {
      const response: AxiosResponse<CreateDocumentResponse> = await this.api
        .getApi()
        .post('/documents', {
          document: data,
        });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async configDocument(
    key: string,
    data: ConfigDocument,
  ): Promise<UpdateDocumentResponse> {
    try {
      const response: AxiosResponse<UpdateDocumentResponse> = await this.api
        .getApi()
        .patch(`/documents/${key}`, data);
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async getDocuments(): Promise<GetDocumentsApiResponse> {
    try {
      const response: AxiosResponse<GetDocumentsApiResponse> = await this.api
        .getApi()
        .get('/documents');
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async getDocument(key: string): Promise<GetDocumentResponse> {
    try {
      const response: AxiosResponse<GetDocumentResponse> = await this.api
        .getApi()
        .get(`/documents/${key}`);

      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async cancelDocument(key: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api
        .getApi()
        .patch(`/documents/${key}/cancel`);

      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async deleteDocument(key: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api
        .getApi()
        .delete(`/documents/${key}`);

      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }
}
