import type { Payment, PaymentMethod } from '@/types/domain'
import type { ReasonChoice } from '../../shared/utils/reasons'

const METHOD_LABEL: Record<PaymentMethod, string> = { funz: 'Funz', transfer: 'Bank transfer', cash: 'Cash' }

export function methodLabel(method: PaymentMethod): string {
  return METHOD_LABEL[method]
}

export function purposeLabel(payment: Payment): string {
  return payment.purpose.kind === 'cause' ? payment.purpose.causeTitle : payment.purpose.purpose
}

export const OFFLINE_REJECT_REASONS: readonly ReasonChoice[] = [
  { value: 'no-proof', label: 'Proof not clear' },
  { value: 'not-received', label: 'Money not received' },
  { value: 'amount', label: 'Amount does not match' },
]
