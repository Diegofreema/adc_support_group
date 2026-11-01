import { StatGrid } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { ChapterRecord } from '../types'

export function ChapterStats({ chapter }: { chapter: ChapterRecord }) {
  const growth = chapter.memberGrowth > 0 ? <><span className="up">+{chapter.memberGrowth}</span> this week</> : undefined
  return (
    <StatGrid
      stats={[
        { label: 'Members', value: formatNumber(chapter.memberCount), sub: growth },
        { label: 'Activities', value: formatNumber(chapter.activityCount) },
        { label: 'LGAs', value: formatNumber(chapter.lgaCount) },
        { label: 'Given', value: formatNairaShort(chapter.amountGiven) },
      ]}
    />
  )
}
