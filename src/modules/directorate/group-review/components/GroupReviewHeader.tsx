import { GroupMark, StatusChip, Tag } from '@/components/shared'
import { groupPlace } from '../utils/group-filters'
import type { ReviewGroup } from '../types'

export function GroupReviewHeader({ group }: { group: ReviewGroup }) {
  return (
    <div className="row mb-4 !items-start">
      <GroupMark name={group.name} />
      <div className="grow">
        <h1 className="h2">{group.name}</h1>
        <div className="row wrap mt-2 !gap-1.5">
          <StatusChip status={group.status} />
          <Tag>{group.category}</Tag>
          <Tag>{groupPlace(group)}</Tag>
        </div>
      </div>
    </div>
  )
}
