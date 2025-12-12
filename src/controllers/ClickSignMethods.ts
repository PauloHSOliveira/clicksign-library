// ClickSignMethods.ts
import { ClickSignAPI } from '../api/ClickSignAPI';
import { ClickSignDocuments } from './Documents';
import { ClickSignSigners } from './Signers';
import { ClickSignEnvelopes } from './Envelopes';

export class ClickSignMethods {
  public documents: ClickSignDocuments;
  public signers: ClickSignSigners;
  public envelopes: ClickSignEnvelopes;

  constructor(api: ClickSignAPI) {
    this.documents = new ClickSignDocuments(api);
    this.signers = new ClickSignSigners(api);
    this.envelopes = new ClickSignEnvelopes(api);
  }
}
