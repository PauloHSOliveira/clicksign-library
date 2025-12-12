import { ClickSignAPI } from '../api/ClickSignAPI';
import {
  CreateEnvelope,
  CreateEnvelopeResponse,
  GetEnvelopeResponse,
  ListEnvelopesResponse,
  UpdateEnvelope,
  AddDocumentToEnvelope,
  AddDocumentToEnvelopeResponse,
  AddSignerToEnvelope,
  AddSignerToEnvelopeResponse,
} from '../types/envelopes';
import { AxiosError, AxiosResponse } from 'axios';
import { format } from 'date-fns';

export class ClickSignEnvelopes {
  private api: ClickSignAPI;

  constructor(api: ClickSignAPI) {
    this.api = api;
  }

  /**
   * Gets the API v3 base URL based on environment
   */
  private getV3Url(): string {
    const apiInstance = this.api.getApi();
    const baseURL = apiInstance.defaults.baseURL || '';
    
    // Convert v1 URL to v3
    if (baseURL.includes('sandbox.clicksign.com')) {
      return baseURL.replace('/api/v1', '/v3');
    }
    // Production: https://api.clicksign.com/api/v1 -> https://api.clicksign.com/v3
    return baseURL.replace('/api/v1', '/v3');
  }

  async createEnvelope(data: CreateEnvelope): Promise<CreateEnvelopeResponse> {
    try {
      const v3Url = this.getV3Url();
      const response: AxiosResponse<CreateEnvelopeResponse> = await this.api
        .getApi()
        .post(`${v3Url}/envelopes`, {
          envelope: {
            name: data.name,
            locale: data.locale || 'pt-BR',
            auto_close: data.auto_close ?? true,
            sequence_enabled: data.sequence_enabled ?? false,
            ...(data.remind_interval && { remind_interval: data.remind_interval }),
            ...(data.deadline_at && {
              deadline_at: format(data.deadline_at, "yyyy-MM-dd'T'HH:mm:ssXXX"),
            }),
          },
        });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async listEnvelopes(page?: number): Promise<ListEnvelopesResponse> {
    try {
      const v3Url = this.getV3Url();
      const params = page ? { page } : {};
      const response: AxiosResponse<ListEnvelopesResponse> = await this.api
        .getApi()
        .get(`${v3Url}/envelopes`, { params });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async getEnvelope(envelopeKey: string): Promise<GetEnvelopeResponse> {
    try {
      const v3Url = this.getV3Url();
      const response: AxiosResponse<GetEnvelopeResponse> = await this.api
        .getApi()
        .get(`${v3Url}/envelopes/${envelopeKey}`);
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async updateEnvelope(
    envelopeKey: string,
    data: UpdateEnvelope,
  ): Promise<GetEnvelopeResponse> {
    try {
      const v3Url = this.getV3Url();
      const updateData: any = {};
      
      if (data.name !== undefined) updateData.name = data.name;
      if (data.locale !== undefined) updateData.locale = data.locale;
      if (data.auto_close !== undefined) updateData.auto_close = data.auto_close;
      if (data.sequence_enabled !== undefined) updateData.sequence_enabled = data.sequence_enabled;
      if (data.remind_interval !== undefined) updateData.remind_interval = data.remind_interval;
      if (data.deadline_at !== undefined) {
        updateData.deadline_at = format(data.deadline_at, "yyyy-MM-dd'T'HH:mm:ssXXX");
      }

      const response: AxiosResponse<GetEnvelopeResponse> = await this.api
        .getApi()
        .patch(`${v3Url}/envelopes/${envelopeKey}`, {
          envelope: updateData,
        });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async deleteEnvelope(envelopeKey: string): Promise<void> {
    try {
      const v3Url = this.getV3Url();
      await this.api
        .getApi()
        .delete(`${v3Url}/envelopes/${envelopeKey}`);
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async cancelEnvelope(envelopeKey: string): Promise<GetEnvelopeResponse> {
    try {
      const v3Url = this.getV3Url();
      const response: AxiosResponse<GetEnvelopeResponse> = await this.api
        .getApi()
        .patch(`${v3Url}/envelopes/${envelopeKey}/cancel`);
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async addDocumentToEnvelope(
    envelopeKey: string,
    data: AddDocumentToEnvelope,
  ): Promise<AddDocumentToEnvelopeResponse> {
    try {
      const v3Url = this.getV3Url();
      const response: AxiosResponse<AddDocumentToEnvelopeResponse> =
        await this.api
          .getApi()
          .post(`${v3Url}/envelopes/${envelopeKey}/documents`, {
            document: {
              document_key: data.document_key,
            },
          });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async addSignerToEnvelope(
    envelopeKey: string,
    data: AddSignerToEnvelope,
  ): Promise<AddSignerToEnvelopeResponse> {
    try {
      const v3Url = this.getV3Url();
      const response: AxiosResponse<AddSignerToEnvelopeResponse> =
        await this.api
          .getApi()
          .post(`${v3Url}/envelopes/${envelopeKey}/signers`, {
            signer: {
              signer_key: data.signer_key,
              sign_as: data.sign_as,
              ...(data.group !== undefined && { group: data.group }),
              ...(data.refusable !== undefined && { refusable: data.refusable }),
            },
          });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }
}
