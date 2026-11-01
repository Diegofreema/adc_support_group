import { EllipsisVertical } from 'lucide-react'

import { Avatar, IconButton } from '@/components/shared'
import type { MemberRecord } from '../types'
import { formatPhone } from '../utils/phone'

/** Avatar, name, phone and an "open" button. */
export function MemberNameCell({ member, onOpen }: { member: MemberRecord; onOpen: () => void }) {
  return (
    <div className="row">
      <Avatar name={member.fullName} size="sm" />
      <span className="grow">
        <span className="bold block">{member.fullName}</span>
        <span className="tiny muted">{formatPhone(member.phone)}</span>
      </span>
      <IconButton icon={EllipsisVertical} label={`Open ${member.fullName}`} onClick={onOpen} />
    </div>
  )
}
