import { Link } from '@tanstack/react-router'
import { Ban, ClipboardCheck, Megaphone, Pencil, QrCode } from 'lucide-react'

import { Button, buttonClassName } from '@/components/shared'
import { canRecord } from '../utils/event-status'
import type { GroupEvent } from '../types'

interface EventManageActionsProps {
  event: GroupEvent
  onShowQr: () => void
  onCancel: () => void
}

/** Organiser buttons, as far as the event's state allows. */
export function EventManageActions({ event, onShowQr, onCancel }: EventManageActionsProps) {
  const params = { eventId: event.id }
  const scheduled = event.status === 'scheduled'
  return (
    <div className="row wrap gap-2">
      {canRecord(event) && (
        <Link to="/events/$eventId/record" params={params} className={buttonClassName('primary')}><Megaphone className="i" aria-hidden />Make it an activity</Link>
      )}
      {event.activityId && (
        <Link to="/activities/$activityId" params={{ activityId: event.activityId }} className={buttonClassName()}><Megaphone className="i" aria-hidden />See the activity</Link>
      )}
      {scheduled && event.checkinCode && <Button icon={QrCode} onClick={onShowQr}>Show check-in QR</Button>}
      {event.status !== 'cancelled' && (
        <Link to="/events/$eventId/attendance" params={params} className={buttonClassName()}><ClipboardCheck className="i" aria-hidden />Attendance</Link>
      )}
      {scheduled && (
        <Link to="/events/$eventId/edit" params={params} className={buttonClassName()}><Pencil className="i" aria-hidden />Edit</Link>
      )}
      {scheduled && <Button variant="danger" icon={Ban} onClick={onCancel}>Cancel</Button>}
    </div>
  )
}
