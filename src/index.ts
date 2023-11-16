// index.ts
import { ClickSignAPI } from './api/ClickSignAPI';
import { ClickSignMethods } from './controllers/ClickSignMethods';
import { ClickSignService } from './services/ClickSignService';
import {
  ClickSignEnvironment,
  ClickSignOptions,
  Document,
  GetDocumentsApiResponse,
  PageInfos,
} from '../types';
import { ApiInstanceTypes } from '../types/apiInstance';

const clickSignService = ({
  apiKey,
  environment,
  debug,
  maxRequests,
  perMilliseconds,
  retryConfig,
}: ApiInstanceTypes) => {
  const api = ClickSignAPI.getInstance({ apiKey, environment });
  const methods = new ClickSignMethods(api);
  const getClickSignService = new ClickSignService(methods);

  return getClickSignService.methods;
};

export {
  clickSignService,
  ClickSignMethods,
  ClickSignAPI,
  ClickSignOptions,
  Document,
  GetDocumentsApiResponse,
  PageInfos,
  ApiInstanceTypes,
};
