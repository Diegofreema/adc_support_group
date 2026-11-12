import type { StatItem } from '@/components/shared'
import { countLabel, formatNairaShort, formatNumber } from '@/lib/format'

const payments = (count: number) => countLabel(count, 'payment', 'payments')
import type { PaymentTotals } from '../types'

export function paymentStats(totals: PaymentTotals): StatItem[] {
  return [
    { label: 'Total raised', value: formatNairaShort(totals.raised), sub: payments(totals.paidCount) },
    { label: 'Funz', value: formatNairaShort(totals.funz), sub: payments(totals.funzCount) },
    { label: 'Offline', value: formatNairaShort(totals.offline), sub: `${formatNumber(totals.offlineCount)} confirmed` },
    { label: 'To confirm', value: formatNairaShort(totals.toConfirm), sub: payments(totals.toConfirmCount) },
  ]
}
