import { AxiosError, AxiosResponse } from 'axios';
import { ClickSignAPI } from '../api/ClickSignAPI';
import { CreateSigner, CreateSignerResponse, GetSignerReponse } from '../types';
import { format } from 'date-fns';
import {
  AddSignerInDocument,
  AddSignerInDocumentResponse,
} from '../types/signers';
export class ClickSignSigners {
  private api: ClickSignAPI;

  constructor(api: ClickSignAPI) {
    this.api = api;
  }

  async createSigner(data: CreateSigner): Promise<CreateSignerResponse> {
    try {
      const response: AxiosResponse<CreateSignerResponse> = await this.api
        .getApi()
        .post('/signers', {
          ...data,
          ...(data.birthday && {
            birthday: format(data.birthday, 'yyyy-MM-dd'),
          }),
        });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async getSigner(signerKey: string): Promise<GetSignerReponse> {
    try {
      const response: AxiosResponse<GetSignerReponse> = await this.api
        .getApi()
        .get(`/signers/${signerKey}`);
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async addSignerInDocument(
    data: AddSignerInDocument,
  ): Promise<AddSignerInDocumentResponse> {
    try {
      const response: AxiosResponse<AddSignerInDocumentResponse> =
        await this.api.getApi().post('/lists', { list: data });
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }

  async removeSignerOfDocument(listKey: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api
        .getApi()
        .delete(`/lists/${listKey}`);
      return response.data;
    } catch (error) {
      this.api.handleErrorResponse(error as AxiosError);
    }
  }
}
