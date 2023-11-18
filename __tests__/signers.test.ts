import { clickSignService } from '../src'; // Certifique-se de importar o módulo correto
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ClickSignEnvironment } from '../src/types';
import {
  AddSignerInDocument,
  CreateSigner,
  CreateSignerResponse,
  GetSignerReponse,
} from '../src/types/signers';
import { map, random, times, sum, isNull } from 'lodash';

function generateRandomDigits(length: number): string {
  return times(length, () => random(9).toString()).join('');
}

function calculateVerifierDigit(base: string): string {
  const weights = times(base.length + 1, (i) => base.length + 1 - i);
  const _sum = sum(
    map(base.split(''), (digit, index) => Number(digit) * weights[index]),
  );
  const remainder = _sum % 11;
  return remainder < 2 ? '0' : (11 - remainder).toString();
}

function generateCPF(): string {
  const nineDigits = generateRandomDigits(9);
  const firstVerifierDigit = calculateVerifierDigit(nineDigits);
  const tenDigits = nineDigits + firstVerifierDigit;
  const secondVerifierDigit = calculateVerifierDigit(tenDigits);
  return tenDigits + secondVerifierDigit;
}

const accessToken = process.env.CLICKSIGN_API_KEY_TEST || '';
const clickSignAPI = clickSignService({
  apiKey: accessToken,
  environment: ClickSignEnvironment.Sandbox,
  debug: true,
  maxRequests: 20,
  perMilliseconds: 4000,
  retryConfig: { retry: 3 },
});

describe('ClickSign API - Signers', () => {
  let signerKey: string | null;
  let documentKey: string | null

  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('createSigner should return 201 status code', async () => {
    const fakeCpf = generateCPF();
    const mockDataToSend: CreateSigner = {
      auths: ['email'],
      email: 'test@example.com',
      name: 'Test User',
      documentation: fakeCpf,
      birthday: new Date('11/11/1998'),
      phone_number: '11988667788',
    };

    const mockResponse: CreateSignerResponse = {
      signer: {
        key: expect.any(String),
        email: expect.any(String),
        auths: expect.any(Array),
        name: expect.any(String),
        documentation: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        birthday: expect.any(String),
        facial_biometrics_enabled: false,
        handwritten_enabled: false,
        has_documentation: true,
        liveness_enabled: false,
        location_required_enabled: false,
        official_document_enabled: false,
        phone_number: expect.any(String),
        selfie_enabled: false,
      },
    };

    mock.onPost('/signers').reply(201, mockResponse);

    const response = await clickSignAPI.signers.createSigner(mockDataToSend);

    signerKey = response.signer.key;

    // Check if the response contains the expected fields
    expect(response).toMatchObject({ signer: mockResponse.signer });
  });

  test('getSigner should return signer', async () => {
    const mockResponse: GetSignerReponse = {
      signer: {
        key: expect.any(String),
        email: expect.any(String),
        auths: expect.any(Array),
        name: expect.any(String),
        documentation: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        birthday: expect.any(String),
        facial_biometrics_enabled: false,
        handwritten_enabled: false,
        has_documentation: true,
        liveness_enabled: false,
        location_required_enabled: false,
        official_document_enabled: false,
        phone_number: expect.any(String),
        selfie_enabled: false,
      },
    };

    mock.onGet(`/signers/${signerKey}`).reply(200, mockResponse);

    if (!signerKey) return;

    const response = await clickSignAPI.signers.getSigner(signerKey);

    // Check if the response contains the expected fields
    expect(response).toMatchObject({ signer: mockResponse.signer });
  });

  test('addSignerInDocument should return 201', async () => {
    const { documents } = await clickSignAPI.documents.getDocuments();

    const document = documents[0]

    if (isNull(signerKey)) return;

    const mockDataToSend: AddSignerInDocument = {
      document_key: document.key,
      signer_key: signerKey,
      sign_as: 'sign',
      message: 'Olá, assine aqui',
      refusable: true,
    };

    const mockResponse = {
      list: {
        key: expect.any(String),
        request_signature_key: expect.any(String),
        document_key: expect.any(String),
        signer_key: expect.any(String),
        sign_as: expect.any(String),
        refusable: true,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        url: expect.any(String),
        message: expect.any(String),
      },
    };

    mock.onPost('/lists').reply(201, mockResponse);

    const response =
      await clickSignAPI.signers.addSignerInDocument(mockDataToSend);

    expect(response).toMatchObject({ list: mockResponse.list });

    documentKey = document.key
  });

  test('removeSignerOfDocument should return 200', async () => {
    mock.onDelete('/lists/key').reply(200);

    if (isNull(documentKey)) return;

    await clickSignAPI.documents.cancelDocument(documentKey);
  });
});
