import { ClickSignEnvironment, GetDocumentsApiResponse } from '../types';
import { ClickSignAPI } from '../api/ClickSignAPI';

export class ClickSignService {
  private clickSignAPI: ClickSignAPI;

  constructor(apiKey: string, environment: ClickSignEnvironment) {
    this.clickSignAPI = new ClickSignAPI(apiKey, environment);
  }

  async createDocumentByTemplate(): Promise<any> {
    return this.clickSignAPI.createDocumentByTemplate();
  }

  async getDocuments(): Promise<GetDocumentsApiResponse> {
    return this.clickSignAPI.getDocuments();
  }

  // Add more methods as needed for other service-related functionalities.
}
