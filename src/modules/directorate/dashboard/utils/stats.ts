import { BadgeCheck, Banknote, Megaphone, UsersRound } from 'lucide-react'

import type { StatItem } from '@/components/shared'
import { formatCompact, formatNairaShort, formatNumber } from '@/lib/format'
import type { DashboardTotals } from '../types'

/** The four headline numbers. */
export function headlineStats(totals: DashboardTotals): StatItem[] {
  return [
    { label: 'Verified groups', icon: BadgeCheck, value: formatNumber(totals.verifiedGroups), sub: `${totals.waitingGroups} waiting` },
    { label: 'Supporters', icon: UsersRound, value: formatCompact(totals.supporters), sub: 'Counted once' },
    { label: 'Activities', icon: Megaphone, value: formatNumber(totals.activities), sub: `+${formatNumber(totals.activitiesThisWeek)} this week` },
    { label: 'Raised', icon: Banknote, value: formatNairaShort(totals.raised), sub: `${formatNairaShort(totals.raisedOffline)} offline` },
  ]
}
