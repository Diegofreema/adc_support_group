import { Check, PlayCircle, X } from 'lucide-react'

import { Button, StatusChip, Tag } from '@/components/shared'
import type { ReviewActivity } from '../types'
import { ActivityFacts } from './ActivityFacts'
import { ActivityMedia } from './ActivityMedia'

interface ActivityReviewCardProps {
  activity: ReviewActivity
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

/** Evidence + facts + approve/reject for one leader-approved activity. */
export function ActivityReviewCard({ activity, onApprove, onReject }: ActivityReviewCardProps) {
  return (
    <article className="feed-card">
      <ActivityMedia urls={activity.photoUrls} />
      <div className="feed-body">
        <div className="row-between"><Tag>{activity.type}</Tag><StatusChip status="pending" label="To check" /></div>
        <h3 className="h3 mt-3">{activity.title}</h3>
        <ActivityFacts activity={activity} />
        {activity.note && <p className="small mt-2">{activity.note}</p>}
        {activity.videoUrl && <a className="small mt-1 row min-h-11" href={activity.videoUrl} target="_blank" rel="noreferrer"><PlayCircle className="i i-sm" aria-hidden />Video</a>}
        <div className="grid-2 mt-4 !grid-cols-2">
          <Button variant="primary" icon={Check} onClick={() => onApprove(activity.id)}>Approve</Button>
          <Button variant="danger" icon={X} onClick={() => onReject(activity.id)}>Reject</Button>
        </div>
      </div>
    </article>
  )
}
