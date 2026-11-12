import { Link } from '@tanstack/react-router'
import { Check, X } from 'lucide-react'

import { Button, Card } from '@/components/shared'
import type { Activity } from '@/types/domain'
import { activityPhotos } from '../utils/activity-photos'
import { ActivityFacts } from './ActivityFacts'
import { ActivityPhotoView } from './ActivityPhotoView'
import { ActivityTypeTag } from './ActivityTypeTag'

interface ReviewCardProps {
  activity: Activity
  busy?: boolean
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

/** One activity waiting for the leader's decision. */
export function ReviewCard({ activity, busy, onApprove, onReject }: ReviewCardProps) {
  return (
    <Card>
      <div className="row-between">
        <ActivityTypeTag type={activity.type} label={activity.typeName} />
        <span className="small muted">{activity.chapterName ?? activity.loggedBy}</span>
      </div>
      <h3 className="h3 mt-3">{activity.title}</h3>
      <ActivityFacts activity={activity} />
      <div className="row-between mt-4">
        <div className="thumbs">{activityPhotos(activity).slice(0, 3).map((photo, index) => <ActivityPhotoView key={index} photo={photo} />)}</div>
        <Link to="/activities/$activityId" params={{ activityId: activity.id }} className="small bold">View</Link>
      </div>
      <div className="grid-2 mt-4 !grid-cols-2">
        <Button icon={X} disabled={busy} onClick={() => onReject(activity.id)}>Reject</Button>
        <Button variant="primary" icon={Check} disabled={busy} onClick={() => onApprove(activity.id)}>Approve</Button>
      </div>
    </Card>
  )
}
