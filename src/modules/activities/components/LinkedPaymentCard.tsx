import { HandCoins } from 'lucide-react'

import { IconTile, ListItem, List, SectionTitle } from '@/components/shared'
import { formatDay, formatNairaShort } from '@/lib/format'
import type { LinkedPayment } from '../types'

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
          meta={`${formatDay(payment.date)} · Paid`}
          trailing={<span className="amount">{formatNairaShort(payment.amount)}</span>}
        />
      </List>
    </section>
  )
}
