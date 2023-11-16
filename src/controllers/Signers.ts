import { AxiosResponse } from 'axios';
import { ClickSignAPI } from '../api/ClickSignAPI';


export class ClickSignSigners {
  private api: ClickSignAPI;

  constructor(api: ClickSignAPI) {
    this.api = api;
  }

  async createSigner(data:any):Promise<any> {
    try {
      const response = await this.api.getApi().post('/signers',{ ...data})
    } catch (error) {

    }
  }

}
