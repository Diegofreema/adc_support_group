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

/**
 * Organiser buttons, as far as the event's state allows: the one thing to do
 * now first and full width, day-of tools next, then Edit / Cancel (rare) below.
 */
export function EventManageActions({ event, onShowQr, onCancel }: EventManageActionsProps) {
  const params = { eventId: event.id }
  const scheduled = event.status === 'scheduled'
  const showQr = scheduled && Boolean(event.checkinCode)
  const attendance = event.status !== 'cancelled'
  return (
    <div className="stack [--stack:10px]">
      {canRecord(event) && (
        <Link to="/events/$eventId/record" params={params} className={buttonClassName('primary', 'lg', true)}><Megaphone className="i" aria-hidden />Make it an activity</Link>
      )}
      {event.activityId && (
        <Link to="/activities/$activityId" params={{ activityId: event.activityId }} className={buttonClassName('secondary', 'md', true)}><Megaphone className="i" aria-hidden />See the activity</Link>
      )}
      {(showQr || attendance) && (
        <div className="grid grid-cols-2 gap-2.5">
          {showQr && <Button icon={QrCode} onClick={onShowQr} className={attendance ? undefined : 'col-span-2'}>Check-in QR</Button>}
          {attendance && <Link to="/events/$eventId/attendance" params={params} className={`${buttonClassName()} ${showQr ? '' : 'col-span-2'}`}><ClipboardCheck className="i" aria-hidden />Attendance</Link>}
        </div>
      )}
      {scheduled && (
        <div className="row-between border-t border-line pt-3">
          <Link to="/events/$eventId/edit" params={params} className="text-link"><Pencil className="i i-sm" aria-hidden />Edit event</Link>
          <button type="button" className="text-link !text-[var(--red)]" onClick={onCancel}><Ban className="i i-sm" aria-hidden />Cancel event</button>
        </div>
      )}
    </div>
  )
}
