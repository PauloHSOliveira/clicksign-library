export interface PageInfos {
  current_page: number;
  'first_page?': boolean;
  'last_page?': boolean;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
}

export interface Document {
  auto_close: boolean;
  deadline_at: string;
  filename: string;
  finished_at: string | null;
  folder_id: number;
  key: string;
  status: string;
  updated_at: string;
  uploaded_at: string;
}

export interface ConfigDocument {
  deadline_at?: Date;
  auto_close?: boolean;
  locale?: 'pt-BR' | 'en-US';
  sequence_enabled?: boolean;
  remind_interval?: 1 | 2 | 3 | 7 | 14;
  block_after_refusal?: boolean;
}

export interface GetDocumentsApiResponse {
  documents: Document[];
  page_infos: PageInfos;
}

export interface CreateDocumentByTemplateResponse {
  document: {
    key: string;
    path: string;
    filename: string;
    uploaded_at: string;
    updated_at: string;
    finished_at: string | null;
    deadline_at: string;
    status: string;
    auto_close: boolean;
    locale: string;
    metadata: object;
    sequence_enabled: boolean;
    signable_group: any;
    remind_interval: any;
    downloads: {
      original_file_url: string;
    };
    template: {
      key: string;
      data: any;
    };
    signers: any[];
    events: [
      {
        name: string;
        data: {
          user: {
            email: string;
            name: string;
          };
          account: {
            key: string;
          };
          deadline_at: string;
          auto_close: boolean;
          locale: string;
        };
        occurred_at: string;
      },
    ];
  };
}

export type GetDocumentResponse = {
  document: Document;
};

export type TemplateDocument = {
  path: string;
  templateKey: string;
  data: any;
};
