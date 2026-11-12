import { HandCoins } from 'lucide-react'

import { IconTile, ListItem, List, SectionTitle } from '@/components/shared'
import { formatDay, formatNairaShort } from '@/lib/format'
import type { PaymentStatus } from '@/types/domain'
import type { LinkedPayment } from '../types'

const STATUS_LABEL: Record<PaymentStatus, string> = { paid: 'Paid', checking: 'Checking', failed: 'Failed', rejected: 'Rejected' }

export function LinkedPaymentCard({ payment }: { payment: LinkedPayment }) {
  return (
    <section>
      <SectionTitle title="Linked payment" className="!mt-0" />
      <List>
        <ListItem
          to="/payments/$paymentId"
          params={{ paymentId: payment.id }}
          leading={<IconTile icon={HandCoins} tone="red" />}
          title={payment.title}
          meta={`${formatDay(payment.date)} · ${STATUS_LABEL[payment.status]}`}
          trailing={<span className="amount">{formatNairaShort(payment.amount)}</span>}
        />
      </List>
    </section>
  )
}
