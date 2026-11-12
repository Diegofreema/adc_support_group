import type { PaymentMethod, PaymentStatus } from '@/types/domain'

export type PayFor = 'cause' | 'general'
export type GeneralPurposeId = 'mobilisation' | 'logistics' | 'media' | 'materials' | 'other'
export type OfflineMethod = Exclude<PaymentMethod, 'funz'>

export interface ChapterOption {
  id: string
  name: string
}

export interface ActivityOption {
  id: string
  title: string
  date: string
}

/** A group member who can be named as the payer of an offline payment. */
export interface PayerOption {
  id: string
  name: string
}

/**
 * Everything chosen in the pay wizard. Online payments are paid by the
 * signed-in person; without a chapter the backend files them under the
 * payer's own chapter (the whole group for a leader).
 */
export interface PayDraft {
  payFor: PayFor
  causeId?: string
  purpose: GeneralPurposeId
  note: string
  amount: number
  activityId?: string
  /** Chapter the payment counts for; undefined = the default above. */
  chapterId?: string
}

/** initiate-group-payment's answer: where to send the payer. */
export interface FunzCheckout {
  paymentId: string
  reference: string
  paymentUrl: string
}

/** verify-group-payment's answer. */
export interface PaymentCheck {
  status: Extract<PaymentStatus, 'checking' | 'paid' | 'failed'>
  amount: number
  expired: boolean
}

export interface OfflinePaymentInput {
  /** A cause id, or "purpose:<GeneralPurposeId>". */
  forId: string
  /** Chapter id, or "" for the whole group. */
  chapterId: string
  /** Member's profile id, or "" for the leader recording it. */
  payerId: string
  amount: number
  /** YYYY-MM-DD */
  date: string
  method: OfflineMethod
  reference?: string
  proof: File
}

export interface PaymentTotals {
  allTime: number
  thisMonth: number
  causes: number
}

/** get_support_group_giving: the payer's campaign giving this calendar year against the Directorate's limit. */
export interface GivingCheck {
  /** null = no limit set. */
  limit: number | null
  givenThisYear: number
  remaining: number | null
  wouldExceed: boolean
}
