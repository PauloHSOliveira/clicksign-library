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
   * Gets the API v3 path for envelopes
   * Returns a relative path that will be combined with the axios baseURL
   */
  private getV3Path(path: string): string {
    // For API v3, use /v3 prefix instead of /api/v1
    return `/v3${path}`;
  }

  async createEnvelope(data: CreateEnvelope): Promise<CreateEnvelopeResponse> {
    try {
      const url = this.getV3Path('/envelopes');
      const response: AxiosResponse<CreateEnvelopeResponse> = await this.api
        .getApi()
        .post(url, {
          envelope: {
            name: data.name,
            locale: data.locale || 'pt-BR',
            auto_close: data.auto_close ?? true,
            sequence_enabled: data.sequence_enabled ?? false,
            ...(data.remind_interval && {
              remind_interval: data.remind_interval,
            }),
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
      const url = this.getV3Path('/envelopes');
      const params = page ? { page } : {};
      const response: AxiosResponse<ListEnvelopesResponse> = await this.api
        .getApi()
        .get(url, { params });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async getEnvelope(envelopeKey: string): Promise<GetEnvelopeResponse> {
    try {
      const url = this.getV3Path(`/envelopes/${envelopeKey}`);
      const response: AxiosResponse<GetEnvelopeResponse> = await this.api
        .getApi()
        .get(url);
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
      const url = this.getV3Path(`/envelopes/${envelopeKey}`);
      const updateData: Record<string, string | number | boolean> = {};

      if (data.name !== undefined) updateData.name = data.name;
      if (data.locale !== undefined) updateData.locale = data.locale;
      if (data.auto_close !== undefined)
        updateData.auto_close = data.auto_close;
      if (data.sequence_enabled !== undefined)
        updateData.sequence_enabled = data.sequence_enabled;
      if (data.remind_interval !== undefined)
        updateData.remind_interval = data.remind_interval;
      if (data.deadline_at !== undefined) {
        updateData.deadline_at = format(
          data.deadline_at,
          "yyyy-MM-dd'T'HH:mm:ssXXX",
        );
      }

      const response: AxiosResponse<GetEnvelopeResponse> = await this.api
        .getApi()
        .patch(url, {
          envelope: updateData,
        });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async deleteEnvelope(envelopeKey: string): Promise<void> {
    try {
      const url = this.getV3Path(`/envelopes/${envelopeKey}`);
      await this.api.getApi().delete(url);
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async cancelEnvelope(envelopeKey: string): Promise<GetEnvelopeResponse> {
    try {
      const url = this.getV3Path(`/envelopes/${envelopeKey}/cancel`);
      const response: AxiosResponse<GetEnvelopeResponse> = await this.api
        .getApi()
        .patch(url);
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
      const url = this.getV3Path(`/envelopes/${envelopeKey}/documents`);
      const response: AxiosResponse<AddDocumentToEnvelopeResponse> =
        await this.api.getApi().post(url, {
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
      const url = this.getV3Path(`/envelopes/${envelopeKey}/signers`);
      const response: AxiosResponse<AddSignerToEnvelopeResponse> =
        await this.api.getApi().post(url, {
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
