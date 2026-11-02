import type { KeyValue } from '@/components/shared'
import type { Payment } from '@/types/domain'
import { methodLabel } from './payment-display'
import { paymentTitle } from './purposes'

/** Receipt rows; optional rows only when they apply. */
export function receiptRows(payment: Payment): KeyValue[] {
  const rows: (KeyValue | false)[] = [
    { label: 'Group', value: payment.groupName },
    Boolean(payment.chapterName) && { label: 'Chapter', value: payment.chapterName },
    { label: 'Paid by', value: payment.payerName },
    { label: 'For', value: paymentTitle(payment) },
    Boolean(payment.activityTitle) && { label: 'Activity', value: payment.activityTitle },
    { label: 'Method', value: methodLabel(payment) },
    { label: 'Receipt no.', value: <span className="num">{payment.reference}</span> },
  ]
  return rows.filter((row): row is KeyValue => Boolean(row))
}
