import { queryOptions } from '@tanstack/react-query'

import { rpc, supabase } from '@/lib/supabase'
import type { BadgeKey } from '@/config/navigation'
import { sessionStore } from '@/stores/session-store'
import type { User } from '@/types/domain'

export type NavBadges = Partial<Record<BadgeKey, number>>

/** Same rule as the notifications list: tagged ADC, or an older support-group notice. */
const ADC_ONLY = 'metadata->>app.eq.adc,metadata->>group_id.not.is.null'

/** Unread ADC notifications: a head-only count, no rows. */
async function unreadNotifications(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false)
    .or(ADC_ONLY)
  if (error) throw new Error(error.message)
  return count ?? 0
}

/** Activities waiting for the leader. An unverified group has none (the RPC refuses). */
async function pendingActivities(): Promise<number> {
  const page = await rpc<{ total: number }>('get_support_group_activities', { p_status: 'pending', p_limit: 1 }).catch(() => ({ total: 0 }))
  return Number(page.total)
}

interface AdminDashboard {
  groups_pending: number
  activities_to_check: number
  payments_to_check: number
}

async function directorateBadges(): Promise<NavBadges> {
  const dashboard = await rpc<AdminDashboard>('get_admin_sg_dashboard')
  return {
    groupsToVerify: Number(dashboard.groups_pending),
    activitiesToCheck: Number(dashboard.activities_to_check),
    offlineToConfirm: Number(dashboard.payments_to_check),
  }
}

async function roleBadges(user: User): Promise<NavBadges> {
  if (user.role === 'leader') return { toReview: await pendingActivities() }
  if (user.role === 'directorate') return directorateBadges()
  return {}
}

async function fetchNavBadges(): Promise<NavBadges> {
  const user = sessionStore.getUser()
  if (!user) return {}
  const [notifications, byRole] = await Promise.all([unreadNotifications(user.id), roleBadges(user)])
  return { notifications, ...byRole }
}

export const navBadgesQuery = queryOptions({ queryKey: ['nav-badges'], queryFn: fetchNavBadges })
