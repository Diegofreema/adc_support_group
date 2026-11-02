import { StatusChip } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { GroupSummary } from '../types/home.types'
import { GroupSwitchHeading } from './GroupSwitchHeading'
import { GrowthCaption } from './GrowthCaption'
import { HeroCard } from './HeroCard'
import { RecordActivityLink } from './RecordActivityLink'

interface LeaderGroupCardProps {
  group: GroupSummary
  onSwitch: () => void
}

export function LeaderGroupCard({ group, onSwitch }: LeaderGroupCardProps) {
  return (
    <HeroCard
      eyebrow="Your group"
      heading={<GroupSwitchHeading name={group.name} onClick={onSwitch} />}
      value={formatNumber(group.memberCount)}
      caption={<GrowthCaption label="members" growth={group.memberGrowth} />}
      badge={<StatusChip status={group.status} />}
      action={<RecordActivityLink />}
    />
  )
}
