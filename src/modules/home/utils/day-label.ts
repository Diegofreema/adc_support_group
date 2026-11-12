import { formatDay } from '@/lib/format'

const DAY_MS = 86_400_000
const weekdayFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'short' })

/** "2026-11-12" is a calendar day; read it in local time, not UTC. */
function toDate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(value)
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/** "Today", "Yesterday", "Mon" (this week), "31 Oct". */
export function dayLabel(value: string, now = new Date()): string {
  const date = toDate(value)
  const days = Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return days < 7 ? weekdayFormat.format(date) : formatDay(date.toISOString())
}

/** "5m", "2h" today; otherwise the day label. */
export function shortAgo(iso: string, now = new Date()): string {
  const minutes = Math.floor((now.getTime() - new Date(iso).getTime()) / 60_000)
  if (minutes < 60 && minutes >= 0) return `${Math.max(1, minutes)}m`
  const label = dayLabel(iso, now)
  return label === 'Today' ? `${Math.floor(minutes / 60)}h` : label
}
