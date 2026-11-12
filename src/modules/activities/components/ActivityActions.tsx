import { Link } from '@tanstack/react-router'
import { Check, Pencil, Undo2 } from 'lucide-react'

import { Button, buttonClassName } from '@/components/shared'
import type { ActivityDetail } from '../types'

interface ActivityActionsProps {
  activity: ActivityDetail
  busy?: boolean
  onApprove: () => void
  onSendBack: () => void
}

/** Edit (while not approved) and Approve / Send back (for whoever can review), as the backend allows. */
export function ActivityActions({ activity, busy, onApprove, onSendBack }: ActivityActionsProps) {
  if (!activity.canEdit && !activity.canReview) return null
  return (
    <div className="row wrap gap-2 mt-4">
      {activity.canEdit && (
        <Link to="/activities/$activityId/edit" params={{ activityId: activity.id }} className={buttonClassName()}>
          <Pencil className="i" aria-hidden />Edit
        </Link>
      )}
      {activity.canReview && <Button icon={Undo2} disabled={busy} onClick={onSendBack}>Send back</Button>}
      {activity.canReview && <Button variant="primary" icon={Check} disabled={busy} onClick={onApprove}>Approve</Button>}
    </div>
  )
}
