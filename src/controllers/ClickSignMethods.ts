// ClickSignMethods.ts
import { ClickSignAPI } from '../api/ClickSignAPI';
import { ClickSignDocuments } from './Documents';
import { ClickSignSigners } from './Signers';

export class ClickSignMethods {
  public documents: ClickSignDocuments;
  public signers: ClickSignSigners;

  constructor(api: ClickSignAPI) {
    this.documents = new ClickSignDocuments(api);
    this.signers = new ClickSignSigners(api);
  }
}
