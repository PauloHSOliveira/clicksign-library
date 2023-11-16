// ClickSignMethods.ts
import { ClickSignAPI } from '../api/ClickSignAPI';
import { ClickSignDocuments } from './Documents';

export class ClickSignMethods {
  public documents: ClickSignDocuments;

  constructor(api: ClickSignAPI) {
    this.documents = new ClickSignDocuments(api);
  }
}
