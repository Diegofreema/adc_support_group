import { Card, KeyValueList, StatusChip } from '@/components/shared'
import { formatDateTime, formatNaira } from '@/lib/format'
import type { Payment } from '@/types/domain'
import { receiptRows } from '../utils/receipt'

export function ReceiptCard({ payment }: { payment: Payment }) {
  return (
    <Card className="card-lg">
      <div className="row-between">
        <span className="brand"><span className="brand-mark"><b>ADC</b></span><span className="brand-name">Receipt</span></span>
        <StatusChip status={payment.status} />
      </div>
      <div className="center mt-8">
        <p className="eyebrow">Amount</p>
        <p className="display mt-2 text-[2.75rem]">{formatNaira(payment.amount)}</p>
        <p className="faint small mt-1">{formatDateTime(payment.date)}</p>
      </div>
      <hr className="divider mt-6" />
      <KeyValueList items={receiptRows(payment)} />
    </Card>
  )
}
