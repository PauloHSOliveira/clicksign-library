// __tests__/clicksign.test.ts
import { clickSignService } from '../src';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ClickSignEnvironment } from '../src/types';

describe('ClickSign API', () => {
  const accessToken = process.env.CLICKSIGN_API_KEY_TEST || '';
  const clickSignAPI = clickSignService(
    accessToken,
    ClickSignEnvironment.Sandbox,
  );

  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('getDocuments should return documents', async () => {
    const mockResponse = {
      documents: [
        {
          auto_close: true,
          deadline_at: '2023-08-24T23:42:08.400-03:00',
          filename: 'Invoice2jl.pdf',
          finished_at: null,
          folder_id: 5785686,
          key: '1cb239ee-7b50-4dba-aa60-d8adc1e97f65',
          status: 'draft',
          updated_at: '2023-07-25T23:42:08.591-03:00',
          uploaded_at: '2023-07-25T23:42:08.588-03:00',
        },
        {
          auto_close: true,
          deadline_at: '2023-08-24T23:43:02.707-03:00',
          filename: 'Invoice2jl.pdf',
          finished_at: null,
          folder_id: 5785686,
          key: 'd6d0f92f-a884-4864-83f2-5e2ddd3ebb86',
          status: 'running',
          updated_at: '2023-07-25T23:46:21.190-03:00',
          uploaded_at: '2023-07-25T23:46:20.776-03:00',
        },
      ],
      page_infos: {
        current_page: 1,
        'first_page?': true,
        'last_page?': true,
        next_page: null,
        prev_page: null,
        total_pages: 1,
      },
    };

    mock.onGet('/api/v1/documents').reply(200, mockResponse);

    const documents = await clickSignAPI.getDocuments();
    expect(documents).toEqual(mockResponse);
  });
});
