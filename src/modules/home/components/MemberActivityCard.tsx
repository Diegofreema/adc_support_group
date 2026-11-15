import { Users } from 'lucide-react'

import { CountUp, Tag } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { GrowthCaption } from './GrowthCaption'
import { HeroCard } from './HeroCard'
import { RecordActivityLink } from './RecordActivityLink'

interface MemberActivityCardProps {
  approvedCount: number
  approvedGrowth: number
  groupCount: number
}

export function MemberActivityCard({ approvedCount, approvedGrowth, groupCount }: MemberActivityCardProps) {
  return (
    <HeroCard
      eyebrow="Your activities"
      value={<CountUp value={approvedCount} format={formatNumber} />}
      caption={<GrowthCaption label="approved so far" growth={approvedGrowth} />}
      badge={groupCount > 0 ? <Tag icon={Users}>{groupCount === 1 ? '1 group' : `${groupCount} groups`}</Tag> : undefined}
      action={<RecordActivityLink />}
    />
  )
}
