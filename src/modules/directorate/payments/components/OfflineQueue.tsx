import { Banknote, Landmark, Receipt } from 'lucide-react'

import { Button, EmptyState, IconTile, List, ListItem } from '@/components/shared'
import { formatDay, formatNaira } from '@/lib/format'
import { methodLabel, purposeLabel } from '../utils/labels'
import type { Payment } from '@/types/domain'

/** Offline payments waiting for staff, each with a "Check" button. */
export function OfflineQueue({ payments, onCheck }: { payments: Payment[]; onCheck: (payment: Payment) => void }) {
  if (!payments.length) return <EmptyState icon={Receipt} title="Nothing to confirm" />
  return (
    <List>
      {payments.map((payment) => (
        <ListItem
          key={payment.id}
          leading={<IconTile icon={payment.method === 'cash' ? Banknote : Landmark} tone="amber" />}
          title={payment.groupName}
          meta={`${purposeLabel(payment)} · ${methodLabel(payment.method)} · ${formatDay(payment.date)}`}
          trailing={<div className="row"><span className="amount hide-mobile">{formatNaira(payment.amount)}</span><Button size="sm" variant="primary" onClick={() => onCheck(payment)}>Check</Button></div>}
        />
      ))}
    </List>
  )
}
