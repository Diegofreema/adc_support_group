import { CountUp, StatusChip } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { GroupSummary } from '../types/home.types'
import { GroupSwitchHeading } from './GroupSwitchHeading'
import { GrowthCaption } from './GrowthCaption'
import { HeroCard } from './HeroCard'
import { RecordActivityLink } from './RecordActivityLink'

interface LeaderGroupCardProps {
  group: GroupSummary
  /** Missing when the leader has only this one group. */
  onSwitch?: () => void
}

export function LeaderGroupCard({ group, onSwitch }: LeaderGroupCardProps) {
  return (
    <HeroCard
      eyebrow="Your group"
      heading={onSwitch ? <GroupSwitchHeading name={group.name} onClick={onSwitch} /> : <h2 className="h3 mt-0.5">{group.name}</h2>}
      value={<CountUp value={group.memberCount} format={formatNumber} />}
      caption={<GrowthCaption label="members" growth={group.memberGrowth} />}
      badge={<StatusChip status={group.status} />}
      action={<RecordActivityLink />}
    />
  )
}
