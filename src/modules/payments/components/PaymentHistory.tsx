import { Wallet } from 'lucide-react'

import { EmptyState, List } from '@/components/shared'
import type { Payment } from '@/types/domain'
import { PaymentRow } from './PaymentRow'

export function PaymentHistory({ payments }: { payments: Payment[] }) {
  if (payments.length === 0) return <EmptyState icon={Wallet} title="No payments yet" />
  return (
    <List>
      {payments.map((payment) => <PaymentRow key={payment.id} payment={payment} />)}
    </List>
  )
}
