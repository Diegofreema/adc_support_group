import { Tag } from '@/components/shared'
import { activityTypeIcon, activityTypeLabel } from '@/config/activity-types'

/** Icon from config by slug; the name from the backend when known. */
export function ActivityTypeTag({ type, label }: { type: string; label?: string }) {
  return <Tag icon={activityTypeIcon(type)}>{label ?? activityTypeLabel(type)}</Tag>
}
