import type { Payment } from '@/types/domain'

export type PaymentsTab = 'to-confirm' | 'all' | 'by-cause'

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
