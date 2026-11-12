import { Tag } from '@/components/shared'
import { activityTypeIcon } from '@/config/activity-types'

export function EventTypeTag({ type, label }: { type: string; label: string }) {
  return <Tag icon={activityTypeIcon(type)}>{label}</Tag>
}
