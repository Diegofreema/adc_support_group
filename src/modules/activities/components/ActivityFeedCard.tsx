import { Link } from '@tanstack/react-router'

import { StatusChip } from '@/components/shared'
import type { Activity } from '@/types/domain'
import { ActivityFacts } from './ActivityFacts'
import { ActivityMedia } from './ActivityMedia'
import { ActivityTypeTag } from './ActivityTypeTag'

export function ActivityFeedCard({ activity }: { activity: Activity }) {
  return (
    <Link to="/activities/$activityId" params={{ activityId: activity.id }} className="feed-card block text-inherit">
      <ActivityMedia tones={activity.photoTones} />
      <div className="feed-body">
        <div className="row-between">
          <ActivityTypeTag type={activity.type} />
          <StatusChip status={activity.status} label={activity.status === 'rejected' ? 'Sent back' : undefined} />
        </div>
        <h3 className="h3 mt-3">{activity.title}</h3>
        <ActivityFacts activity={activity} />
      </div>
    </Link>
  )
}
