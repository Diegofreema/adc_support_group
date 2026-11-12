import type { PaidTotals } from '../services/payments.service'
import type { PaymentTotals, ReviewPayment } from '../types'

/** Paid totals split into Funz and offline, plus whatever is waiting for staff right now. */
export function paymentTotals(paid: PaidTotals, waiting: ReviewPayment[]): PaymentTotals {
  return {
    ...paid,
    offline: paid.raised - paid.funz,
    offlineCount: paid.paidCount - paid.funzCount,
    toConfirm: waiting.reduce((sum, payment) => sum + payment.amount, 0),
    toConfirmCount: waiting.length,
  }
}
