import { Banner, Card } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { groupPlace } from '../utils/group-filters'
import type { ReviewGroup } from '../types'

interface CompareCardProps {
  label: string
  name: string
  place: string
  members: number
}

/** Side-by-side: this application vs the verified group it may copy. */
export function DuplicateBanner({ group }: { group: ReviewGroup }) {
  if (!group.duplicate) return null
  return (
    <Banner tone="warn" title="Possible duplicate">
      <div className="grid-2 mt-3">
        <CompareCard label="This one" name={group.name} place={groupPlace(group)} members={group.memberCount} />
        <CompareCard label="Verified" name={group.duplicate.name} place={group.duplicate.place} members={group.duplicate.memberCount} />
      </div>
    </Banner>
  )
}

function CompareCard({ label, name, place, members }: CompareCardProps) {
  return (
    <Card className="!p-3">
      <div className="eyebrow">{label}</div>
      <div className="bold mt-1">{name}</div>
      <div className="small faint">{place} · {formatNumber(members)} members</div>
    </Card>
  )
}
