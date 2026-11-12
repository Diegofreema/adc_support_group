import type { Status } from '@/types/domain'
import type { GroupEvent } from '../types'
import { hasStarted } from './event-time'

const HOURS_OPEN_AFTER = 3 * 60 * 60_000

/** The backend's "upcoming" rule: scheduled, and not past 3h after the start (or the end, if later). */
export function isUpcoming(event: GroupEvent, now = Date.now()): boolean {
  if (event.status !== 'scheduled') return false
  const start = new Date(event.startsAt).getTime()
  const end = event.endsAt ? new Date(event.endsAt).getTime() : start
  return Math.max(start + HOURS_OPEN_AFTER, end) >= now
}

/** The stamp on a card or the event page; none for an ordinary upcoming event. */
export function eventChip(event: GroupEvent): { status: Status; label: string } | undefined {
  if (event.status === 'cancelled') return { status: 'rejected', label: 'Cancelled' }
  if (event.status === 'done') return { status: 'approved', label: 'Done' }
  if (event.checkinOpen) return { status: 'open', label: 'On now' }
  if (!isUpcoming(event)) return { status: 'closed', label: 'Ended' }
  return undefined
}

/** "Kofar Mata, Gwale, Kano" */
export function eventPlace(event: GroupEvent): string {
  return [event.ward, event.lga, event.state].filter(Boolean).join(', ')
}

export function eventAudience(event: GroupEvent): string {
  return event.chapterName ? `${event.chapterName} chapter` : 'Whole group'
}

/** The organiser's next step is recording it as an activity (after the start, once). */
export function canRecord(event: GroupEvent): boolean {
  return event.canManage && event.status === 'scheduled' && !event.activityId && hasStarted(event.startsAt)
}
