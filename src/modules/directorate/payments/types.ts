import type { Payment, PaymentStatus } from '@/types/domain'

export type PaymentsTab = 'to-confirm' | 'all' | 'over-limit' | 'by-cause'

/** A payment as staff see it: with the path of the uploaded proof, if any. */
export interface ReviewPayment extends Payment {
  proofPath?: string
}

export interface CauseTotal {
  causeId: string
  title: string
  raised: number
  target: number
  groups: number
}

export interface PaymentTotals {
  raised: number
  paidCount: number
  funz: number
  funzCount: number
  offline: number
  offlineCount: number
  toConfirm: number
  toConfirmCount: number
}

/** A payment that took its payer past the yearly giving limit. */
export interface OverLimitPayment {
  id: string
  groupId: string
  groupName: string
  payerName: string
  amount: number
  /** The payer's paid giving that year before this payment. */
  givenBefore: number
  status: PaymentStatus
  date: string
}

export interface OverLimitPage {
  total: number
  /** The limit now (null = none set). */
  limit: number | null
  rows: OverLimitPayment[]
}
