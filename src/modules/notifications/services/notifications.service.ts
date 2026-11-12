import { toNotification, type NotificationRow } from '../utils/to-notification'
import type { AppNotification } from '../types/notification.types'
import { supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'

const LIMIT = 100

function userId(): string {
  const user = sessionStore.getUser()
  if (!user) throw new Error('Sign in first')
  return user.id
}

/** The caller's ADC notifications (the table is shared with Rise Up; RLS shows only their own). */
export async function fetchNotifications(): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, type, title, body, action_url, is_read, metadata, created_at')
    .eq('user_id', userId())
    .eq('metadata->>app', 'adc')
    .order('created_at', { ascending: false })
    .limit(LIMIT)
  if (error) throw new Error(error.message)
  return (data as NotificationRow[]).map(toNotification)
}

export async function markAllRead(): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId())
    .eq('is_read', false)
    .eq('metadata->>app', 'adc')
  if (error) throw new Error(error.message)
}
