import type { ReactNode } from 'react'

import { Card, CardHead, StatusChip } from '@/components/shared'
import { formatDay } from '@/lib/format'
import type { ReviewGroup } from '../types'

/** Shown instead of the decision buttons once a group has been decided. */
export function DecidedCard({ group, action }: { group: ReviewGroup; action?: ReactNode }) {
  const reason = group.rejectionReason ?? group.suspendedReason
  return (
    <Card>
      <CardHead title="Decision" />
      <div className="row-between">
        <StatusChip status={group.status} />
        {group.decidedAt && <span className="small faint">{formatDay(group.decidedAt)}</span>}
      </div>
      {reason && <p className="reason mt-3">{reason}</p>}
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}
