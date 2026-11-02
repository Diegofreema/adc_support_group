import { GroupMark, StatusChip, Tag } from '@/components/shared'
import type { Group } from '@/types/domain'
import { levelLabel } from '../utils/labels'

/** Big monogram, name, status and two tags. */
export function GroupHeader({ group }: { group: Group }) {
  return (
    <div className="row gap-3.5">
      <GroupMark name={group.name} className="!size-15 !text-xl" />
      <div className="grow">
        <h1 className="h1 !text-2xl">{group.name}</h1>
        <div className="row wrap mt-2 !gap-2">
          <StatusChip status={group.status} />
          <Tag>{group.category}</Tag>
          <Tag>{levelLabel(group.level)}</Tag>
        </div>
      </div>
    </div>
  )
}
