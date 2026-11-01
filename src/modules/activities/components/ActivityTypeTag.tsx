import { Tag } from '@/components/shared'
import { activityTypeIcon, activityTypeLabel } from '../utils/activity-types'

export function ActivityTypeTag({ type }: { type: string }) {
  return <Tag icon={activityTypeIcon(type)}>{activityTypeLabel(type)}</Tag>
}
