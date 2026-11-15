import { CalendarCheck, UserCheck } from 'lucide-react'

import { StatGrid } from '@/components/shared'
import { formatNumber } from '@/lib/format'

export function AttendanceCounts({ coming, present }: { coming: number; present: number }) {
  return (
    <StatGrid
      columns={2}
      stats={[
        { label: 'Said coming', value: formatNumber(coming), icon: CalendarCheck },
        { label: 'Came', value: formatNumber(present), icon: UserCheck },
      ]}
    />
  )
}
