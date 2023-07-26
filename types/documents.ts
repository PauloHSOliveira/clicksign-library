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

export interface GetDocumentsApiResponse {
  documents: Document[];
  page_infos: PageInfos;
}
