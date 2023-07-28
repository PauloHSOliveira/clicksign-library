import { ClickSignEnvironment, GetDocumentsApiResponse } from '../../types';
import {
  CreateDocumentByTemplateResponse,
  TemplateDocument,
} from '../../types/documents';
import { ClickSignMethods } from '../controllers/ClickSignMethods';

export class ClickSignService {
  private api: ClickSignMethods;

  private constructor(apiKey: string, environment: ClickSignEnvironment) {
    this.api = ClickSignMethods.getInstance(apiKey, environment);
  }

  static getInstance(
    apiKey: string,
    environment: ClickSignEnvironment,
  ): ClickSignService {
    return new ClickSignService(apiKey, environment);
  }

  async createDocumentByTemplate(
    templateData: TemplateDocument,
  ): Promise<CreateDocumentByTemplateResponse> {
    return this.api.createDocumentByTemplate(templateData);
  }

  async getDocuments(): Promise<GetDocumentsApiResponse> {
    return this.api.getDocuments();
  }

  // Add more service-related functionalities if needed.
}
