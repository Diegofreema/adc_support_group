import type { PaymentMethod } from '@/types/domain'

export type PayFor = 'cause' | 'general'
export type GeneralPurposeId = 'mobilisation' | 'logistics' | 'media' | 'materials' | 'other'
export type Payer = 'group' | 'chapter'
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

/** Everything chosen in the pay wizard. */
export interface PayDraft {
  payFor: PayFor
  causeId?: string
  purpose: GeneralPurposeId
  note: string
  payer: Payer
  chapterId?: string
  amount: number
  activityId?: string
}

export interface OfflinePaymentInput {
  /** Cause id, or "general". */
  forId: string
  /** Chapter id, or "group". */
  payerId: string
  amount: number
  date: string
  method: OfflineMethod
  reference?: string
  proofName: string
}

export interface PaymentTotals {
  allTime: number
  thisMonth: number
  causes: number
}
