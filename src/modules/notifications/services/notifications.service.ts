import { NOTIFICATIONS } from './notifications.mock'
import type { AppNotification } from '../types/notification.types'
import { respond } from '@/lib/mock-api'

/** Mock: real version reads the shared `notifications` table. */
export async function fetchNotifications(): Promise<AppNotification[]> {
  return respond(NOTIFICATIONS)
}

export async function markAllRead(): Promise<void> {
  NOTIFICATIONS.forEach((notification) => { notification.unread = false })
  await respond(null, 200)
}
