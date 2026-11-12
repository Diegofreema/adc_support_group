import { Award, EllipsisVertical } from 'lucide-react'

import { Avatar, IconButton, Tag } from '@/components/shared'
import type { MemberRecord } from '../types'
import { formatPhone } from '@/lib/phone'

/** Avatar, name, the Active member badge when earned, phone and an "open" button. */
export function MemberNameCell({ member, onOpen }: { member: MemberRecord; onOpen: () => void }) {
  return (
    <div className="row">
      <Avatar name={member.fullName} size="sm" />
      <span className="grow">
        <span className="bold block">{member.fullName}</span>
        {member.activeMember && <Tag icon={Award}>Active member</Tag>}
        <span className="tiny muted">{formatPhone(member.phone)}</span>
      </span>
      <IconButton icon={EllipsisVertical} label={`Open ${member.fullName}`} onClick={onOpen} />
    </div>
  )
}
