import type { Payment } from '@/types/domain'
import type { PaymentTotals } from '../types'

type BaseTotals = Omit<PaymentTotals, 'toConfirm' | 'toConfirmCount'>

export function waitingOffline(payments: Payment[]): Payment[] {
  return payments.filter((payment) => payment.status === 'checking')
}

/** Platform totals plus whatever is waiting for staff right now. */
export function paymentTotals(base: BaseTotals, payments: Payment[]): PaymentTotals {
  const waiting = waitingOffline(payments)
  return { ...base, toConfirm: waiting.reduce((sum, payment) => sum + payment.amount, 0), toConfirmCount: waiting.length }
}
