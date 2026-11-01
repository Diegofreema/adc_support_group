import { StatGrid } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { Group } from '@/types/domain'

export function GroupStats({ group }: { group: Group }) {
  return (
    <StatGrid
      stats={[
        { label: 'Members', value: formatNumber(group.memberCount) },
        { label: 'Chapters', value: formatNumber(group.chapterCount) },
        { label: 'Activities', value: formatNumber(group.activityCount) },
        { label: 'Given', value: formatNairaShort(group.amountGiven) },
      ]}
    />
  )
}
