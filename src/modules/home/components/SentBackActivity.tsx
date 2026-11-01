import { Link } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'

import { buttonClassName, IconTile, StatusChip } from '@/components/shared'
import type { MyActivity } from '../types/home.types'
import { activityIcon } from '../utils/activity-icons'

/** An activity the leader sent back, with the reason and a Fix button. */
export function SentBackActivity({ activity }: { activity: MyActivity }) {
  return (
    <div className="list-item !block">
      <div className="row">
        <IconTile icon={activityIcon(activity.activityType)} tone="red" />
        <span className="grow">
          <span className="title truncate block">{activity.title}</span>
          <span className="meta block">{activity.meta}</span>
        </span>
        <StatusChip status="rejected" label="Sent back" />
      </div>
      <div className="row mt-3">
        <div className="reason grow">{activity.reason}</div>
        <Link to="/activities/new" className={buttonClassName('secondary', 'sm')}><Pencil className="i i-sm" aria-hidden />Fix</Link>
      </div>
    </div>
  )
}
