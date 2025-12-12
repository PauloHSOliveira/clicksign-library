export enum EnvelopeStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  RUNNING = 'running',
  CLOSED = 'closed',
  CANCELED = 'canceled',
}

export interface CreateEnvelope {
  name: string;
  locale?: 'pt-BR' | 'en-US';
  auto_close?: boolean;
  sequence_enabled?: boolean;
  remind_interval?: 1 | 2 | 3 | 7 | 14;
  deadline_at?: Date;
}

export interface UpdateEnvelope {
  name?: string;
  locale?: 'pt-BR' | 'en-US';
  auto_close?: boolean;
  sequence_enabled?: boolean;
  remind_interval?: 1 | 2 | 3 | 7 | 14;
  deadline_at?: Date;
}

export interface EnvelopeDocument {
  key: string;
  filename: string;
  status: string;
  created_at: string;
}

export interface EnvelopeSigner {
  key: string;
  email: string;
  name: string;
  documentation?: string;
  sign_as: string;
  created_at: string;
}

export interface Envelope {
  key: string;
  name: string;
  status: EnvelopeStatus;
  locale: string;
  auto_close: boolean;
  sequence_enabled?: boolean;
  remind_interval?: number;
  deadline_at?: string;
  created_at: string;
  updated_at?: string;
  documents: EnvelopeDocument[];
  signers: EnvelopeSigner[];
}

export interface CreateEnvelopeResponse {
  envelope: Envelope;
}

export interface GetEnvelopeResponse {
  envelope: Envelope;
}

export interface ListEnvelopesResponse {
  envelopes: Envelope[];
  pagination?: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_items: number;
  };
}

export interface AddDocumentToEnvelope {
  document_key: string;
}

export interface AddDocumentToEnvelopeResponse {
  envelope: Envelope;
}

export interface AddSignerToEnvelope {
  signer_key: string;
  sign_as: string;
  group?: number;
  refusable?: boolean;
}

export interface AddSignerToEnvelopeResponse {
  envelope: Envelope;
}
