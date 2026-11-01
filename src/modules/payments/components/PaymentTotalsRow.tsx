import { StatGrid } from '@/components/shared'
import { formatNairaShort } from '@/lib/format'
import type { PaymentTotals } from '../types'

export function PaymentTotalsRow({ totals }: { totals: PaymentTotals }) {
  return (
    <StatGrid
      columns={3}
      stats={[
        { label: 'All time', value: formatNairaShort(totals.allTime) },
        { label: 'This month', value: formatNairaShort(totals.thisMonth) },
        { label: 'Causes', value: totals.causes },
      ]}
    />
  )
}
