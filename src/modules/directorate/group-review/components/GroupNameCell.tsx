import { Copy } from 'lucide-react'

import { GroupMark } from '@/components/shared'
import type { ReviewGroup } from '../types'

/** Mark + name, with a duplicate warning when needed. */
export function GroupNameCell({ group }: { group: ReviewGroup }) {
  return (
    <div className="row">
      <GroupMark name={group.name} className="!h-10 !w-10 !text-[0.8125rem]" />
      <div className="grow">
        <div className="bold">{group.name}</div>
        {group.possibleDuplicateOf && <DuplicateChip />}
      </div>
    </div>
  )
}

function DuplicateChip() {
  return (
    <span className="chip chip-pending mt-1">
      <Copy className="i" aria-hidden />
      Possible duplicate
    </span>
  )
}
