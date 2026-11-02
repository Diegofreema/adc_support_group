import { IconTile, ListItem, StatusChip } from '@/components/shared'
import { formatNaira } from '@/lib/format'
import type { Payment } from '@/types/domain'
import { isSettled, paymentIcon, paymentMeta, paymentTone } from '../utils/payment-display'
import { paymentTitle } from '../utils/purposes'

/** One payment in the history; paid ones open the receipt. */
export function PaymentRow({ payment }: { payment: Payment }) {
  const link = isSettled(payment) || payment.status === 'checking'
  return (
    <ListItem
      to={link ? '/payments/$paymentId' : undefined}
      params={link ? { paymentId: payment.id } : undefined}
      leading={<IconTile icon={paymentIcon(payment)} tone={paymentTone(payment)} />}
      title={paymentTitle(payment)}
      meta={paymentMeta(payment)}
      trailing={<PaymentAmount payment={payment} />}
    />
  )
}

function PaymentAmount({ payment }: { payment: Payment }) {
  return (
    <span className="text-right">
      <span className={`amount block ${isSettled(payment) || payment.status === 'checking' ? '' : 'faint'}`}>{formatNaira(payment.amount)}</span>
      <span className="mt-1 inline-block"><StatusChip status={payment.status} /></span>
    </span>
  )
}
