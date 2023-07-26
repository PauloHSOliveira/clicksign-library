import { AxiosInstance, AxiosResponse } from 'axios';
import { GetDocumentsApiResponse } from '../../../types';

export async function getDocuments(
  api: AxiosInstance,
): Promise<GetDocumentsApiResponse> {
  try {
    const response: AxiosResponse<GetDocumentsApiResponse> = await api.get(
      '/documents',
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch documents from ClickSign API.');
  }
}
