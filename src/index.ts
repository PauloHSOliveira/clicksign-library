import { ClickSignService } from './services/ClickSignService';
import { ClickSignEnvironment } from './types';

// Export the public API of your library
export const clickSignService = (
  apiKey: string,
  environment: ClickSignEnvironment,
) => {
  return ClickSignService.getInstance(apiKey, environment);
};
