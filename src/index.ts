import { ClickSignService } from './services/ClickSignService';
import {
  ClickSignEnvironment,
  ClickSignOptions,
  Document,
  GetDocumentsApiResponse,
  PageInfos,
} from '../types';

const clickSignService = (
  apiKey: string,
  environment: ClickSignEnvironment,
) => {
  return ClickSignService.getInstance(apiKey, environment);
};

export {
  clickSignService,
  ClickSignEnvironment,
  ClickSignOptions,
  Document,
  GetDocumentsApiResponse,
  PageInfos,
};
