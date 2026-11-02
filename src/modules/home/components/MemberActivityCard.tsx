import { Users } from 'lucide-react'

import { Tag } from '@/components/shared'
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
      value={formatNumber(approvedCount)}
      caption={<GrowthCaption label="approved" growth={approvedGrowth} />}
      badge={<Tag icon={Users}>{groupCount} groups</Tag>}
      action={<RecordActivityLink />}
    />
  )
}
