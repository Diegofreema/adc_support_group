import { SectionTitle, StatGrid } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { LeaderDashboard } from '../types/home.types'

/** The group's running totals (the backend keeps totals, not monthly figures). */
export function MonthStats({ totals }: { totals: LeaderDashboard['totals'] }) {
  const stats = [
    { label: 'Activities', value: formatNumber(totals.activities) },
    { label: 'Chapters', value: formatNumber(totals.chapters) },
    { label: 'Given', value: formatNairaShort(totals.given) },
  ]
  return (
    <>
      <SectionTitle title="So far" />
      <StatGrid stats={stats} columns={3} />
    </>
  )
}
