export interface CreateSigner {
  auths: string[]
  birthday?: Date
  communicate_by?: 'email' | 'whatsapp'
  delivery?: 'email'|'none'
  documentation?: string
  email?: string
  facial_biometrics_enabled?: boolean
  handwritten_enabled?: boolean
  has_documentation?: boolean
  liveness_enabled?: boolean
}
