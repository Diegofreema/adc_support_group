import { User, Users } from 'lucide-react'

import { Card, GroupMark, StatusChip, Tag } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Invite } from '../../types/auth.types'

/** The group a join link points to. */
export function InviteCard({ invite }: { invite: Invite }) {
  return (
    <Card className="mt-5">
      <div className="row">
        <GroupMark name={invite.groupName} />
        <span className="grow">
          <span className="h3 block">{invite.groupName}</span>
          {invite.chapterName && <span className="muted small">{invite.chapterName}</span>}
        </span>
      </div>
      <div className="row wrap mt-4 !gap-2">
        <StatusChip status={invite.status} />
        <Tag icon={Users}>{formatNumber(invite.memberCount)}</Tag>
        <Tag icon={User}>{invite.invitedBy}</Tag>
      </div>
    </Card>
  )
}
