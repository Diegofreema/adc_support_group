import { Trash2 } from 'lucide-react'

import { Avatar, IconButton } from '@/components/shared'
import type { StaffMember } from '../types'

export function StaffRow({ member, onRemove }: { member: StaffMember; onRemove: (member: StaffMember) => void }) {
  const isSuper = member.role === 'super-admin'
  return (
    <div className="setting">
      <Avatar name={member.fullName} size="sm" />
      <span className="grow min-w-0"><span className="bold block truncate">{member.fullName}</span><span className="small faint">{member.contact}</span></span>
      <span className={`chip ${isSuper ? 'chip-approved' : 'chip-neutral'}`}>{isSuper ? 'Super admin' : 'Staff'}</span>
      {!isSuper && <IconButton icon={Trash2} label={`Remove ${member.fullName}`} onClick={() => onRemove(member)} />}
    </div>
  )
}
