export interface CreateSigner {
  auths: string[];
  birthday?: Date;
  communicate_by?: 'email' | 'whatsapp';
  delivery?: 'email' | 'none';
  documentation?: string;
  email?: string;
  facial_biometrics_enabled?: boolean;
  handwritten_enabled?: boolean;
  has_documentation?: boolean;
  liveness_enabled?: boolean;
  location_required_enabled?: boolean;
  name?: string;
  official_document_enabled?: boolean;
  phone_number?: string;
  selfie_enabled?: boolean;
}

export type Signer = {
  key: string;
  email: string;
  auths: string[];
  name: string;
  documentation: string;
  birthday: string;
  phone_number: string;
  has_documentation: boolean;
  selfie_enabled: boolean;
  handwritten_enabled: boolean;
  location_required_enabled: boolean;
  official_document_enabled: boolean;
  liveness_enabled: boolean;
  facial_biometrics_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateSignerResponse = {
  signer: Signer;
};

export type GetSignerReponse = {
  signer: Signer;
};

type SignAsType =
  | 'account_holder'
  | 'accountant'
  | 'administrator'
  | 'approve'
  | 'associate'
  | 'attorney'
  | 'bailee'
  | 'broker'
  | 'buyer'
  | 'co_responsible'
  | 'collateral_provider'
  | 'comforter'
  | 'consenting'
  | 'consignee'
  | 'contractee'
  | 'contractor'
  | 'creditor'
  | 'debtor'
  | 'distracted'
  | 'distracting'
  | 'employee'
  | 'employer'
  | 'endorsee'
  | 'endorser'
  | 'franchisee'
  | 'franchisor'
  | 'grantee'
  | 'grantor'
  | 'guarantor'
  | 'insured'
  | 'intervening'
  | 'issuer'
  | 'joint_debtor'
  | 'lawyer'
  | 'legal_representative'
  | 'lender'
  | 'lessee'
  | 'lessor'
  | 'manager'
  | 'partner'
  | 'party'
  | 'pledged'
  | 'president'
  | 'ratify'
  | 'receipt'
  | 'seller'
  | 'sign'
  | 'signed'
  | 'surety'
  | 'transferee'
  | 'transferor'
  | 'validator'
  | 'witness';

export enum SignAs {
  ACCOUNT_HOLDER = 'account_holder',
  ACCOUNTANT = 'accountant',
  ADMINISTRATOR = 'administrator',
  APPROVE = 'approve',
  ASSOCIATE = 'associate',
  ATTORNEY = 'attorney',
  BAILEE = 'bailee',
  BROKER = 'broker',
  BUYER = 'buyer',
  CO_RESPONSIBLE = 'co_responsible',
  COLLATERAL_PROVIDER = 'collateral_provider',
  COMFORTER = 'comforter',
  CONSENTING = 'consenting',
  CONSIGNEE = 'consignee',
  CONTRACTEE = 'contractee',
  CONTRACTOR = 'contractor',
  CREDITOR = 'creditor',
  DEBTOR = 'debtor',
  DISTRACTED = 'distracted',
  DISTRACTING = 'distracting',
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
  ENDORSEE = 'endorsee',
  ENDORSER = 'endorser',
  FRANCHISEE = 'franchisee',
  FRANCHISOR = 'franchisor',
  GRANTEE = 'grantee',
  GRANTOR = 'grantor',
  GUARANTOR = 'guarantor',
  INSURED = 'insured',
  INTERVENING = 'intervening',
  ISSUER = 'issuer',
  JOINT_DEBTOR = 'joint_debtor',
  LAWYER = 'lawyer',
  LEGAL_REPRESENTATIVE = 'legal_representative',
  LENDER = 'lender',
  LESSEE = 'lessee',
  LESSOR = 'lessor',
  MANAGER = 'manager',
  PARTNER = 'partner',
  PARTY = 'party',
  PLEDGED = 'pledged',
  PRESIDENT = 'president',
  RATIFY = 'ratify',
  RECEIPT = 'receipt',
  SELLER = 'seller',
  SIGN = 'sign',
  SIGNED = 'signed',
  SURETY = 'surety',
  TRANSFEREE = 'transferee',
  TRANSFEROR = 'transferor',
  VALIDATOR = 'validator',
  WITNESS = 'witness',
}

export type AddSignerInDocument = {
  document_key: string;
  signer_key: string;
  sign_as: SignAsType;
  group?: number;
  message?: string;
  refusable?: boolean;
};

export type List = {
  key: string;
  request_signature_key: string;
  document_key: string;
  signer_key: string;
  sign_as: string;
  refusable: boolean;
  created_at: string;
  updated_at: string;
  url: string;
  group: number;
  message: string;
};

export type AddSignerInDocumentResponse = {
  list: List;
};
