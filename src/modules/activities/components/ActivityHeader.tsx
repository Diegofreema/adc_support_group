import { StatusChip } from '@/components/shared'
import { activityPlace } from '../utils/activity-display'
import type { ActivityDetail } from '../types'
import { ActivityByline } from './ActivityByline'
import { ActivityFacts } from './ActivityFacts'
import { ActivityTypeTag } from './ActivityTypeTag'

export function ActivityHeader({ activity }: { activity: ActivityDetail }) {
  return (
    <header>
      <div className="row-between wrap gap-2">
        <ActivityTypeTag type={activity.type} label={activity.typeName} />
        <StatusChip status={activity.status} label={activity.status === 'rejected' ? 'Sent back' : undefined} />
      </div>
      <h1 className="h1 mt-3">{activity.title}</h1>
      <ActivityFacts activity={activity} place={activityPlace(activity)} />
      <ActivityByline activity={activity} />
    </header>
  )
}
