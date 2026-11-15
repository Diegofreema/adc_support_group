import { Award, ChevronRight } from 'lucide-react'

import { Avatar, Tag } from '@/components/shared'
import type { MemberRecord } from '../types'
import { formatPhone } from '@/lib/phone'

/** Avatar, name, the Active member badge when earned, and phone: one big button that opens the member. */
export function MemberNameCell({ member, onOpen }: { member: MemberRecord; onOpen: () => void }) {
  return (
    <button type="button" className="member-open row w-full text-left" onClick={onOpen} aria-label={`Open ${member.fullName}`}>
      <Avatar name={member.fullName} size="sm" />
      <span className="grow min-w-0">
        <span className="bold block truncate">{member.fullName}</span>
        {member.activeMember && <Tag icon={Award}>Active member</Tag>}
        <span className="small muted block">{formatPhone(member.phone)}</span>
      </span>
      <ChevronRight className="i chev shrink-0 text-muted-foreground" aria-hidden />
    </button>
  )
}
