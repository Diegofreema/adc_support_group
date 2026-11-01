import type { StatItem } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { PaymentTotals } from '../types'

export function paymentStats(totals: PaymentTotals): StatItem[] {
  return [
    { label: 'Total raised', value: formatNairaShort(totals.raised), sub: `${formatNumber(totals.groups)} groups` },
    { label: 'Funz', value: formatNairaShort(totals.funz), sub: `${formatNumber(totals.funzCount)} payments` },
    { label: 'Offline', value: formatNairaShort(totals.offline), sub: `${formatNumber(totals.offlineCount)} confirmed` },
    { label: 'To confirm', value: formatNairaShort(totals.toConfirm), sub: `${totals.toConfirmCount} payments` },
  ]
}
