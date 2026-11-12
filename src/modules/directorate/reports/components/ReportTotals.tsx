import { Banknote, Megaphone, ShieldCheck, UserRound, UsersRound } from 'lucide-react'

import { StatGrid, type StatItem } from '@/components/shared'
import { formatCompact, formatNairaShort, formatNumber } from '@/lib/format'
import type { ReportTotals as Totals } from '../types'

function stats(totals: Totals): StatItem[] {
  return [
    { label: 'Verified groups', icon: ShieldCheck, value: formatNumber(totals.groups) },
    { label: 'Members', icon: UsersRound, value: formatCompact(totals.members) },
    { label: 'Activities', icon: Megaphone, value: formatNumber(totals.activities), sub: <><UserRound className="i i-sm inline" aria-hidden /> {formatCompact(totals.peopleReached)} reached</> },
    { label: 'Paid', icon: Banknote, value: formatNairaShort(totals.amountPaid) },
  ]
}

/** Headline numbers for the chosen period. */
export function ReportTotals({ totals }: { totals: Totals }) {
  return <div className="mb-6"><StatGrid stats={stats(totals)} /></div>
}
