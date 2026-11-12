import { Link } from '@tanstack/react-router'

import { Banner, GroupMark, StatusChip, Tag } from '@/components/shared'
import { groupPlace } from '../utils/group-filters'
import type { ReviewGroup } from '../types'

export function GroupReviewHeader({ group }: { group: ReviewGroup }) {
  return (
    <div className="mb-4">
      <div className="row !items-start">
        <GroupMark name={group.name} photoUrl={group.photoUrl} />
        <div className="grow">
          <h1 className="h2">{group.name}</h1>
          <div className="row wrap mt-2 !gap-1.5">
            <StatusChip status={group.status} />
            <Tag>{group.category}</Tag>
            <Tag>{groupPlace(group)}</Tag>
          </div>
        </div>
      </div>
      {group.pendingName && (
        <Banner tone="warn" className="mt-4" title={`The leader asked to rename it: ${group.pendingName}`}>
          <Link to="/admin/settings" search={{ tab: 'names' }} className="bold">Review name changes</Link>
        </Banner>
      )}
    </div>
  )
}
