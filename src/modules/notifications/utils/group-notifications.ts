import type { AppNotification, NotificationDay, NotificationFilter, NotificationSectionData } from '../types/notification.types'
import { notificationStyle } from './notification-style'

const DAY_TITLES: Record<NotificationDay, string> = { today: 'Today', week: 'This week' }
const DAY_ORDER: NotificationDay[] = ['today', 'week']

export function filterNotifications(items: AppNotification[], filter: NotificationFilter): AppNotification[] {
  if (filter === 'all') return items
  return items.filter((item) => notificationStyle(item.kind).topic === filter)
}

/** Split into "Today" / "This week", dropping empty sections. */
export function groupByDay(items: AppNotification[]): NotificationSectionData[] {
  return DAY_ORDER
    .map((day) => ({ day, title: DAY_TITLES[day], items: items.filter((item) => item.day === day) }))
    .filter((section) => section.items.length > 0)
}

export function countUnread(items: AppNotification[]): number {
  return items.filter((item) => item.unread).length
}
