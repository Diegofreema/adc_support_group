import { Avatar, KeyValueList } from '@/components/shared'
import { formatDay } from '@/lib/format'
import type { MemberRecord } from '../types'
import { joinedViaLabel } from '../utils/export-members'
import { formatPhone } from '../utils/phone'

/** Who this member is: avatar, phone and key facts. */
export function MemberDetails({ member }: { member: MemberRecord }) {
  return (
    <>
      <div className="row">
        <Avatar name={member.fullName} size="lg" />
        <div>
          <p className="h3">{member.fullName}</p>
          <p className="muted small">{formatPhone(member.phone)}</p>
        </div>
      </div>
      <div className="mt-4">
        <KeyValueList
          items={[
            { label: 'Ward', value: member.ward ?? '—' },
            { label: 'Chapter', value: member.chapterName ?? 'Whole group' },
            { label: 'Joined', value: `${formatDay(member.joinedAt)} · ${joinedViaLabel(member.joinedVia)}` },
            { label: 'Activities', value: member.activityCount },
          ]}
        />
      </div>
    </>
  )
}
