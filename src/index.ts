import { ClickSignEnvironment } from './types';
import { ClickSignService } from './services/ClickSignService';

// Export the public API of your library
export function createClickSignService(
  apiKey: string,
  environment: ClickSignEnvironment,
): ClickSignService {
  return new ClickSignService(apiKey, environment);
}
