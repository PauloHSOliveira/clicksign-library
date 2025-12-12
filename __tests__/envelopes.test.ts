import { clickSignService } from '../src';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ClickSignEnvironment } from '../src/types';
import {
  CreateEnvelope,
  CreateEnvelopeResponse,
  GetEnvelopeResponse,
  ListEnvelopesResponse,
  UpdateEnvelope,
  AddDocumentToEnvelope,
  AddSignerToEnvelope,
  EnvelopeStatus,
} from '../src/types/envelopes';

const accessToken = process.env.CLICKSIGN_API_KEY_TEST || '';
const clickSignAPI = clickSignService({
  apiKey: accessToken,
  environment: ClickSignEnvironment.Sandbox,
  debug: true,
  maxRequests: 20,
  perMilliseconds: 4000,
  retryConfig: { retries: 3 },
});

describe('ClickSign API - Envelopes (v3)', () => {
  let envelopeKey: string | null = null;

  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('createEnvelope should return 201 status code', async () => {
    const mockDataToSend: CreateEnvelope = {
      name: 'Contrato de Prestação de Serviço',
      locale: 'pt-BR',
      auto_close: true,
      sequence_enabled: false,
      remind_interval: 7,
    };

    const mockResponse: CreateEnvelopeResponse = {
      envelope: {
        key: 'env_abcdef12345',
        name: 'Contrato de Prestação de Serviço',
        status: EnvelopeStatus.DRAFT,
        locale: 'pt-BR',
        auto_close: true,
        sequence_enabled: false,
        remind_interval: 7,
        created_at: '2025-12-12T14:15:00Z',
        documents: [],
        signers: [],
      },
    };

    mock.onPost(/\/v3\/envelopes$/).reply(201, mockResponse);

    const response = await clickSignAPI.envelopes.createEnvelope(mockDataToSend);

    envelopeKey = response.envelope.key;

    expect(response).toMatchObject(mockResponse);
    expect(response.envelope).toHaveProperty('key');
    expect(response.envelope).toHaveProperty('name');
    expect(response.envelope).toHaveProperty('status');
    expect(response.envelope.status).toBe(EnvelopeStatus.DRAFT);
  });

  test('listEnvelopes should return envelopes', async () => {
    const mockResponse: ListEnvelopesResponse = {
      envelopes: [
        {
          key: 'env_abcdef12345',
          name: 'Contrato de Prestação de Serviço',
          status: EnvelopeStatus.DRAFT,
          locale: 'pt-BR',
          auto_close: true,
          sequence_enabled: false,
          created_at: '2025-12-12T14:15:00Z',
          documents: [],
          signers: [],
        },
        {
          key: 'env_xyz789',
          name: 'Contrato de Compra e Venda',
          status: EnvelopeStatus.RUNNING,
          locale: 'pt-BR',
          auto_close: true,
          sequence_enabled: false,
          created_at: '2025-12-11T10:00:00Z',
          documents: [],
          signers: [],
        },
      ],
      pagination: {
        current_page: 1,
        total_pages: 1,
        per_page: 20,
        total_items: 2,
      },
    };

    mock.onGet(/\/v3\/envelopes$/).reply(200, mockResponse);

    const response = await clickSignAPI.envelopes.listEnvelopes();

    expect(Array.isArray(response.envelopes)).toBe(true);
    expect(response.envelopes.length).toBeGreaterThan(0);
    response.envelopes.forEach((envelope) => {
      expect(envelope).toHaveProperty('key');
      expect(envelope).toHaveProperty('name');
      expect(envelope).toHaveProperty('status');
      expect(envelope).toHaveProperty('locale');
      expect(envelope).toHaveProperty('auto_close');
      expect(envelope).toHaveProperty('created_at');
      expect(envelope).toHaveProperty('documents');
      expect(envelope).toHaveProperty('signers');
    });
  });

  test('listEnvelopes with pagination should work', async () => {
    const mockResponse: ListEnvelopesResponse = {
      envelopes: [
        {
          key: 'env_page2',
          name: 'Contrato Página 2',
          status: EnvelopeStatus.DRAFT,
          locale: 'pt-BR',
          auto_close: true,
          sequence_enabled: false,
          created_at: '2025-12-10T14:15:00Z',
          documents: [],
          signers: [],
        },
      ],
      pagination: {
        current_page: 2,
        total_pages: 5,
        per_page: 20,
        total_items: 95,
      },
    };

    mock.onGet(/\/v3\/envelopes/, { params: { page: 2 } }).reply(200, mockResponse);

    const response = await clickSignAPI.envelopes.listEnvelopes(2);

    expect(response.pagination?.current_page).toBe(2);
  });

  test('getEnvelope should return envelope details', async () => {
    const mockResponse: GetEnvelopeResponse = {
      envelope: {
        key: 'env_abcdef12345',
        name: 'Contrato de Prestação de Serviço',
        status: EnvelopeStatus.DRAFT,
        locale: 'pt-BR',
        auto_close: true,
        sequence_enabled: false,
        remind_interval: 7,
        created_at: '2025-12-12T14:15:00Z',
        updated_at: '2025-12-12T14:20:00Z',
        documents: [],
        signers: [],
      },
    };

    mock.onGet(/\/v3\/envelopes\/env_abcdef12345$/).reply(200, mockResponse);

    if (!envelopeKey) {
      envelopeKey = 'env_abcdef12345';
    }

    const response = await clickSignAPI.envelopes.getEnvelope(envelopeKey);

    expect(response.envelope).toHaveProperty('key');
    expect(response.envelope).toHaveProperty('name');
    expect(response.envelope).toHaveProperty('status');
    expect(response.envelope.key).toBe(envelopeKey);
  });

  test('updateEnvelope should return updated envelope', async () => {
    const mockDataToSend: UpdateEnvelope = {
      name: 'Contrato Atualizado',
      auto_close: false,
      remind_interval: 14,
    };

    const mockResponse: GetEnvelopeResponse = {
      envelope: {
        key: 'env_abcdef12345',
        name: 'Contrato Atualizado',
        status: EnvelopeStatus.DRAFT,
        locale: 'pt-BR',
        auto_close: false,
        sequence_enabled: false,
        remind_interval: 14,
        created_at: '2025-12-12T14:15:00Z',
        updated_at: '2025-12-12T15:00:00Z',
        documents: [],
        signers: [],
      },
    };

    mock.onPatch(/\/v3\/envelopes\/env_abcdef12345$/).reply(200, mockResponse);

    if (!envelopeKey) {
      envelopeKey = 'env_abcdef12345';
    }

    const response = await clickSignAPI.envelopes.updateEnvelope(
      envelopeKey,
      mockDataToSend,
    );

    expect(response.envelope.name).toBe('Contrato Atualizado');
    expect(response.envelope.auto_close).toBe(false);
    expect(response.envelope.remind_interval).toBe(14);
  });

  test('cancelEnvelope should return canceled envelope', async () => {
    const mockResponse: GetEnvelopeResponse = {
      envelope: {
        key: 'env_abcdef12345',
        name: 'Contrato de Prestação de Serviço',
        status: EnvelopeStatus.CANCELED,
        locale: 'pt-BR',
        auto_close: true,
        sequence_enabled: false,
        created_at: '2025-12-12T14:15:00Z',
        updated_at: '2025-12-12T16:00:00Z',
        documents: [],
        signers: [],
      },
    };

    mock.onPatch(/\/v3\/envelopes\/env_abcdef12345\/cancel$/).reply(200, mockResponse);

    if (!envelopeKey) {
      envelopeKey = 'env_abcdef12345';
    }

    const response = await clickSignAPI.envelopes.cancelEnvelope(envelopeKey);

    expect(response.envelope.status).toBe(EnvelopeStatus.CANCELED);
  });

  test('addDocumentToEnvelope should add document successfully', async () => {
    const mockDataToSend: AddDocumentToEnvelope = {
      document_key: 'doc_123456',
    };

    const mockResponse = {
      envelope: {
        key: 'env_abcdef12345',
        name: 'Contrato de Prestação de Serviço',
        status: EnvelopeStatus.DRAFT,
        locale: 'pt-BR',
        auto_close: true,
        sequence_enabled: false,
        created_at: '2025-12-12T14:15:00Z',
        documents: [
          {
            key: 'doc_123456',
            filename: 'contrato.pdf',
            status: 'pending',
            created_at: '2025-12-12T14:30:00Z',
          },
        ],
        signers: [],
      },
    };

    mock
      .onPost(/\/v3\/envelopes\/env_abcdef12345\/documents$/)
      .reply(201, mockResponse);

    if (!envelopeKey) {
      envelopeKey = 'env_abcdef12345';
    }

    const response = await clickSignAPI.envelopes.addDocumentToEnvelope(
      envelopeKey,
      mockDataToSend,
    );

    expect(response.envelope.documents.length).toBeGreaterThan(0);
    expect(response.envelope.documents[0].key).toBe('doc_123456');
  });

  test('addSignerToEnvelope should add signer successfully', async () => {
    const mockDataToSend: AddSignerToEnvelope = {
      signer_key: 'signer_789',
      sign_as: 'sign',
      refusable: true,
    };

    const mockResponse = {
      envelope: {
        key: 'env_abcdef12345',
        name: 'Contrato de Prestação de Serviço',
        status: EnvelopeStatus.DRAFT,
        locale: 'pt-BR',
        auto_close: true,
        sequence_enabled: false,
        created_at: '2025-12-12T14:15:00Z',
        documents: [],
        signers: [
          {
            key: 'signer_789',
            email: 'test@example.com',
            name: 'Test User',
            sign_as: 'sign',
            created_at: '2025-12-12T14:35:00Z',
          },
        ],
      },
    };

    mock
      .onPost(/\/v3\/envelopes\/env_abcdef12345\/signers$/)
      .reply(201, mockResponse);

    if (!envelopeKey) {
      envelopeKey = 'env_abcdef12345';
    }

    const response = await clickSignAPI.envelopes.addSignerToEnvelope(
      envelopeKey,
      mockDataToSend,
    );

    expect(response.envelope.signers.length).toBeGreaterThan(0);
    expect(response.envelope.signers[0].key).toBe('signer_789');
    expect(response.envelope.signers[0].sign_as).toBe('sign');
  });

  test('deleteEnvelope should delete envelope successfully', async () => {
    mock.onDelete(/\/v3\/envelopes\/env_abcdef12345$/).reply(204);

    if (!envelopeKey) {
      envelopeKey = 'env_abcdef12345';
    }

    await clickSignAPI.envelopes.deleteEnvelope(envelopeKey);

    // No response body expected for delete
    expect(true).toBe(true);
  });
});
