import { CalendarCheck, UserCheck } from 'lucide-react'

import { StatGrid } from '@/components/shared'
import { formatNumber } from '@/lib/format'

export function AttendanceCounts({ coming, present }: { coming: number; present: number }) {
  return (
    <StatGrid
      columns={2}
      stats={[
        { label: 'Coming', value: formatNumber(coming), icon: CalendarCheck },
        { label: 'Present', value: formatNumber(present), icon: UserCheck },
      ]}
    />
  )
}
