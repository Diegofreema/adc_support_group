import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { StatGrid } from '@/components/shared'
import { formatNairaShort } from '@/lib/format'
import type { MoneySummary } from '../types'

/** Money in / out, all time and this month. */
export function MoneyTotals({ summary }: { summary: MoneySummary }) {
  return (
    <StatGrid
      columns={2}
      stats={[
        { label: 'Money in', icon: ArrowDownLeft, value: formatNairaShort(summary.moneyIn), sub: `${formatNairaShort(summary.monthIn)} this month` },
        { label: 'Money out', icon: ArrowUpRight, value: formatNairaShort(summary.moneyOut), sub: `${formatNairaShort(summary.monthOut)} this month` },
      ]}
    />
  )
}
