import { Avatar } from '@/components/shared'
import type { StaffMember, StaffRole } from '../types'

const ROLE_LABEL: Record<StaffRole, string> = { super_admin: 'Super admin', admin: 'Admin', state_admin: 'State admin' }

export function StaffRow({ member }: { member: StaffMember }) {
  const isSuper = member.role === 'super_admin'
  const role = member.role === 'state_admin' && member.state ? `${ROLE_LABEL.state_admin} · ${member.state}` : ROLE_LABEL[member.role]
  return (
    <div className="setting">
      <Avatar name={member.fullName} size="sm" />
      <span className="grow min-w-0"><span className="bold block truncate">{member.fullName}</span><span className="small faint">{member.contact}</span></span>
      <span className={`chip ${isSuper ? 'chip-approved' : 'chip-neutral'}`}>{role}</span>
    </div>
  )
}
