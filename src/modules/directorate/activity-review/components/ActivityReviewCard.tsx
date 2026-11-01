import { Check, Flag, X } from 'lucide-react'

import { Button, StatusChip, Tag } from '@/components/shared'
import type { ReviewActivity } from '../types'
import { ActivityFacts } from './ActivityFacts'
import { ActivityMedia } from './ActivityMedia'

interface ActivityReviewCardProps {
  activity: ReviewActivity
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

/** Evidence + facts + approve/reject for one activity. */
export function ActivityReviewCard({ activity, onApprove, onReject }: ActivityReviewCardProps) {
  return (
    <article className="feed-card">
      <ActivityMedia tones={activity.photoTones} />
      <div className="feed-body">
        <div className="row-between"><Tag>{activity.type}</Tag><StatusChip status="pending" label="To check" /></div>
        <h3 className="h3 mt-3">{activity.title}</h3>
        <ActivityFacts activity={activity} />
        {activity.flagReason && <p className="reason mt-3"><Flag className="i i-sm inline" aria-hidden /> {activity.flagReason}</p>}
        <div className="grid-2 mt-4 !grid-cols-2">
          <Button variant="primary" icon={Check} onClick={() => onApprove(activity.id)}>Approve</Button>
          <Button variant="danger" icon={X} onClick={() => onReject(activity.id)}>Reject</Button>
        </div>
      </div>
    </article>
  )
}
