import { ClickSignMethods } from '../controllers/ClickSignMethods';

export class ClickSignService {
  public methods: ClickSignMethods;

  constructor(methods: ClickSignMethods) {
    this.methods = methods;
  }
}
