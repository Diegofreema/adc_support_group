import { StatusChip } from '@/components/shared'
import type { Activity } from '@/types/domain'
import { activityPlace } from '../utils/activity-display'
import { ActivityFacts } from './ActivityFacts'
import { ActivityTypeTag } from './ActivityTypeTag'

export function ActivityHeader({ activity }: { activity: Activity }) {
  return (
    <header>
      <div className="row-between wrap gap-2">
        <ActivityTypeTag type={activity.type} />
        <StatusChip status={activity.status} label={activity.status === 'rejected' ? 'Sent back' : undefined} />
      </div>
      <h1 className="h1 mt-3">{activity.title}</h1>
      <ActivityFacts activity={activity} place={activityPlace(activity)} />
    </header>
  )
}
