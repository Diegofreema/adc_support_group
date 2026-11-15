import { SectionTitle, StatGrid } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { LeaderDashboard } from '../types/home.types'

/** The group's last 30 days: approved activities, new chapters, amount paid. */
export function MonthStats({ month }: { month: LeaderDashboard['month'] }) {
  const stats = [
    { label: 'Activities', value: formatNumber(month.activities) },
    { label: 'Chapters', value: formatNumber(month.chapters) },
    { label: 'Paid', value: formatNairaShort(month.given) },
  ]
  return (
    <>
      <SectionTitle title="Last 30 days" />
      <StatGrid stats={stats} columns={3} />
    </>
  )
}
