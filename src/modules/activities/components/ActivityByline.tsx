import { Pencil } from 'lucide-react'

import { Tag } from '@/components/shared'
import { recordedByText } from '../utils/activity-display'
import type { ActivityDetail } from '../types'

/** "Recorded by …" when someone recorded it for the member, and an "Edited" tag after an edit. */
export function ActivityByline({ activity, className = 'mt-2' }: { activity: ActivityDetail; className?: string }) {
  const recordedBy = recordedByText(activity)
  if (!recordedBy && activity.version <= 1) return null
  return (
    <div className={`row wrap gap-2 ${className}`}>
      {activity.version > 1 && <Tag icon={Pencil}>Edited</Tag>}
      {recordedBy && <span className="small muted">{recordedBy}</span>}
    </div>
  )
}
