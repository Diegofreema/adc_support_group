export type PaymentsTab = 'to-confirm' | 'all' | 'by-cause'

export interface CauseTotal {
  causeId: string
  title: string
  raised: number
  target: number
  payments: number
}

export interface PaymentTotals {
  raised: number
  groups: number
  funz: number
  funzCount: number
  offline: number
  offlineCount: number
  toConfirm: number
  toConfirmCount: number
}
