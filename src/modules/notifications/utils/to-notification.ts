import { formatDay } from '@/lib/format'
import type { AppNotification, NotificationDay, NotificationKind } from '../types/notification.types'

/** One row of the shared `notifications` table. */
export interface NotificationRow {
  id: string
  type: string
  title: string
  body: string
  action_url: string | null
  is_read: boolean
  metadata: Record<string, unknown> | null
  created_at: string
}

const has = (metadata: Record<string, unknown>, key: string) => metadata[key] != null

function activityKind(title: string): NotificationKind {
  if (/approved/i.test(title)) return 'activity-approved'
  if (/sent back|rejected/i.test(title)) return 'activity-sent-back'
  return 'activity-waiting'
}

function groupKind(title: string, metadata: Record<string, unknown>): NotificationKind {
  if (metadata.decision === 'verified') return 'group-verified'
  if (/handover approved|you now lead/i.test(title)) return 'handover-approved'
  if (/were added to/i.test(title)) return 'members-joined'
  return 'group-update'
}

/** The ADC backend tags rows by metadata (activity_id, payment_id, mode, decision, kind). */
export function notificationKind(row: NotificationRow): NotificationKind {
  const metadata = row.metadata ?? {}
  if (has(metadata, 'activity_id')) return activityKind(row.title)
  if (has(metadata, 'payment_id')) return /rejected|failed/i.test(row.title) ? 'payment-rejected' : 'payment-received'
  if (has(metadata, 'mode')) return 'message'
  return groupKind(row.title, metadata)
}

const DAY_MS = 86_400_000
const timeFormat = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit' })
const weekdayFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'short' })

function startOfToday(now: Date): number {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
}

export function notificationDay(iso: string, now = new Date()): NotificationDay {
  const at = new Date(iso).getTime()
  const today = startOfToday(now)
  if (at >= today) return 'today'
  return at >= today - 6 * DAY_MS ? 'week' : 'earlier'
}

/** "9:12" today, "Mon" this week, "31 Oct" before that. */
export function notificationTime(iso: string, day: NotificationDay): string {
  if (day === 'today') return timeFormat.format(new Date(iso))
  return day === 'week' ? weekdayFormat.format(new Date(iso)) : formatDay(iso)
}

export function toNotification(row: NotificationRow): AppNotification {
  const day = notificationDay(row.created_at)
  return {
    id: row.id,
    kind: notificationKind(row),
    title: row.title,
    meta: row.body,
    time: notificationTime(row.created_at, day),
    day,
    unread: !row.is_read,
    to: row.action_url || '/notifications',
  }
}
