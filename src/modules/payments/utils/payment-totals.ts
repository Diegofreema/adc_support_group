import type { Payment } from '@/types/domain'
import type { PaymentTotals } from '../types'
import { isSettled } from './payment-display'

function sumAmounts(payments: Payment[]): number {
  return payments.reduce((total, payment) => total + payment.amount, 0)
}

function isThisMonth(iso: string, now: Date): boolean {
  const date = new Date(iso)
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
}

function causesSupported(payments: Payment[]): number {
  const keys = payments.map((payment) => (payment.purpose.kind === 'cause' ? payment.purpose.causeId : 'general'))
  return new Set(keys).size
}

/** Totals count only payments that went through. */
export function paymentTotals(payments: Payment[], now = new Date()): PaymentTotals {
  const settled = payments.filter(isSettled)
  return {
    allTime: sumAmounts(settled),
    thisMonth: sumAmounts(settled.filter((payment) => isThisMonth(payment.date, now))),
    causes: causesSupported(settled),
  }
}

export function filterByChapter(payments: Payment[], chapter: string): Payment[] {
  return chapter ? payments.filter((payment) => payment.chapterName === chapter) : payments
}
