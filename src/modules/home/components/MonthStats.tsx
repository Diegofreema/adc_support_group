import { SectionTitle, StatGrid } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { LeaderDashboard } from '../types/home.types'

export function MonthStats({ month }: { month: LeaderDashboard['month'] }) {
  const stats = [
    { label: 'Activities', value: formatNumber(month.activities) },
    { label: 'Chapters', value: formatNumber(month.chapters) },
    { label: 'Given', value: formatNairaShort(month.given) },
  ]
  return (
    <>
      <SectionTitle title="This month" />
      <StatGrid stats={stats} columns={3} />
    </>
  )
}
