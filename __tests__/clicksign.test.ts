// __tests__/clicksign.test.ts
import { clickSignService } from '../src';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ClickSignEnvironment } from '../types';
import { TemplateDocument } from '../types/documents';
import { isNull } from 'util';

describe('ClickSign API', () => {
  const accessToken = process.env.CLICKSIGN_API_KEY_TEST || '';
  const clickSignAPI = clickSignService(
    accessToken,
    ClickSignEnvironment.Sandbox,
  );

  let documentKey: string | null;

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

    // Check if the response is an array
    expect(Array.isArray(documents.documents)).toBe(true);

    // Check if each object in the array contains the expected keys
    documents.documents.forEach((document) => {
      expect(document).toHaveProperty('auto_close');
      expect(document).toHaveProperty('deadline_at');
      expect(document).toHaveProperty('filename');
      expect(document).toHaveProperty('finished_at');
      expect(document).toHaveProperty('folder_id');
      expect(document).toHaveProperty('key');
      expect(document).toHaveProperty('status');
      expect(document).toHaveProperty('updated_at');
      expect(document).toHaveProperty('uploaded_at');
    });
  });

  test('createDocument should return 201 status code', async () => {
    const mockDataToSend = {
      path: '/Models/Test-123.docx',
      templateKey: 'a250d85b-1688-4145-838a-122f4a4febf7',
      data: {
        company: 'Test',
        full_address: 'Test Address',
        zip: '31080-231',
        cnpj: '12.123.321/0001-12',
        value: '$ 10.0000',
      },
    } as TemplateDocument;

    const mockResponse = {
      document: {
        key: expect.any(String),
        path: expect.any(String),
        filename: expect.any(String),
        uploaded_at: expect.any(String),
        updated_at: expect.any(String),
        finished_at: null,
        deadline_at: expect.any(String),
        status: expect.any(String),
        auto_close: expect.any(Boolean),
        locale: expect.any(String),
        metadata: expect.any(Object),
        sequence_enabled: expect.any(Boolean),
        signable_group: null,
        remind_interval: null,
        downloads: {
          original_file_url: expect.any(String),
        },
        template: {
          key: mockDataToSend.templateKey,
          data: {
            ...mockDataToSend.data,
          },
        },
        signers: [],
        events: [
          {
            name: expect.any(String),
            data: {
              user: {
                email: expect.any(String),
                name: expect.any(String),
              },
              account: {
                key: expect.any(String),
              },
              deadline_at: expect.any(String),
              auto_close: expect.any(Boolean),
              locale: expect.any(String),
            },
            occurred_at: expect.any(String),
          },
        ],
      },
    };

    mock
      .onPost(`/templates/${mockDataToSend.templateKey}/documents`)
      .reply(201);

    const response = await clickSignAPI.createDocumentByTemplate(
      mockDataToSend,
    );

    documentKey = response.document.key;

    // Check if the response contains the expected fields
    expect(response).toMatchObject(mockResponse);
  });

  test('getDocument by key should return documents', async () => {
    const mockResponse = {
      key: '3d3ec51f-8ef8-4d26-92e9-21f29b9e284f',
      account_key: 'fcac372b-dd89-40b1-99fd-0d8133d1266c',
      path: '/Models/Test-123.docx',
      filename: 'Test-123.docx',
      uploaded_at: '2023-08-26T23:48:35.640Z',
      updated_at: '2023-08-26T23:48:35.647Z',
      deadline_at: '2023-09-25T20:48:35.498-03:00',
      status: 'running',
      auto_close: true,
      locale: 'pt-BR',
    };

    mock.onGet('/api/v1/document/key').reply(200, mockResponse);

    if (isNull(documentKey)) return;

    const response = await clickSignAPI.getDocument(documentKey);
    const document = response.document;
    // Check if each object in the array contains the expected keys

    expect(document).toHaveProperty('key');
    expect(document).toHaveProperty('account_key');
    expect(document).toHaveProperty('path');
    expect(document).toHaveProperty('filename');
    expect(document).toHaveProperty('uploaded_at');
    expect(document).toHaveProperty('updated_at');
    expect(document).toHaveProperty('deadline_at');
    expect(document).toHaveProperty('status');
    expect(document).toHaveProperty('auto_close');
    expect(document).toHaveProperty('locale');
  });

  test('cancelDocument by key should return success', async () => {
    mock.onPatch('/api/v1/document/key/cancel').reply(200);

    if (isNull(documentKey)) return;

    await clickSignAPI.cancelDocument(documentKey);
  });

  test('deleteDocument by key should return success', async () => {
    mock.onDelete('/api/v1/document/key/cancel').reply(200);

    if (isNull(documentKey)) return;

    await clickSignAPI.deleteDocument(documentKey);
  });
});
