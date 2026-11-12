import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import { adminSettingsQuery, fetchAdminSettings, type AdminSettingsJson } from '../../shared/services/admin-settings'
import type { ActivityType, Category, Handover, NameChange, StaffMember, StaffRole } from '../types'
import { rpc } from '@/lib/supabase'

type SettingsJson = AdminSettingsJson

interface StaffJson {
  id: string
  full_name: string
  contact: string | null
  role: StaffRole
  state: string | null
}

interface HandoverJson {
  id: string
  group_name: string
  from_name: string
  to_name: string
  reason: string | null
  requested_at: string
}

const fetchSettings = fetchAdminSettings

/** Categories, activity types and the SMS budget come from one RPC; each part selects its own. */
const settingsQuery = adminSettingsQuery

export const categoriesQuery = queryOptions({
  ...settingsQuery,
  select: (data: SettingsJson): Category[] => data.categories.map((row) => ({ id: row.id, name: row.name, groupCount: Number(row.group_count), isActive: row.is_active })),
})

export const activityTypesQuery = queryOptions({
  ...settingsQuery,
  select: (data: SettingsJson): ActivityType[] => data.activity_types.map((row) => ({ id: row.id, name: row.name, enabled: row.is_enabled })),
})

/** Read-only: staff are managed in Rise Up's admin. */
export const staffQuery = queryOptions({
  queryKey: directorateKeys.settings('staff'),
  queryFn: async (): Promise<StaffMember[]> => (await rpc<StaffJson[]>('get_admin_sg_staff')).map((row) => ({
    id: row.id, fullName: row.full_name, contact: row.contact ?? '', role: row.role, state: row.state ?? undefined,
  })),
})

export const handoversQuery = queryOptions({
  queryKey: directorateKeys.settings('handovers'),
  queryFn: async (): Promise<Handover[]> => (await rpc<HandoverJson[]>('get_admin_sg_handovers', { p_status: 'pending' })).map((row) => ({
    id: row.id, groupName: row.group_name, fromName: row.from_name, toName: row.to_name, reason: row.reason ?? undefined, requestedAt: row.requested_at,
  })),
})

function saveCategory(id: string | null, name: string, isActive: boolean | null): Promise<string> {
  return rpc<string>('save_support_group_category', { p_category_id: id, p_name: name, p_is_active: isActive, p_sort: null })
}

/** Adding a name that was removed earlier brings that category back. */
export async function addCategory(name: string): Promise<void> {
  const { categories } = await fetchSettings()
  const removed = categories.find((category) => !category.is_active && category.name.toLowerCase() === name.toLowerCase())
  await (removed ? saveCategory(removed.id, removed.name, true) : saveCategory(null, name, true))
}

export async function renameCategory({ id, name }: { id: string; name: string }): Promise<void> {
  await saveCategory(id, name, null)
}

/** Removing hides it from new registrations; groups keep their category. */
export async function removeCategory(category: Category): Promise<void> {
  await saveCategory(category.id, category.name, false)
}

export async function addActivityType(name: string): Promise<void> {
  await rpc('save_support_group_activity_type', { p_type_id: null, p_name: name, p_is_enabled: true, p_sort: null })
}

export async function setActivityTypeEnabled({ type, enabled }: { type: ActivityType; enabled: boolean }): Promise<void> {
  await rpc('save_support_group_activity_type', { p_type_id: type.id, p_name: type.name, p_is_enabled: enabled, p_sort: null })
}

/** Approve swaps the leader in one transaction; either way it leaves the queue. */
export async function decideHandover({ id, approve }: { id: string; approve: boolean }): Promise<void> {
  await rpc('review_support_group_handover', { p_handover_id: id, p_approve: approve, p_note: null })
}

/** The yearly campaign giving limit per person; null = no limit. Any staff can read it. */
export const givingLimitQuery = queryOptions({
  queryKey: directorateKeys.settings('giving-limit'),
  queryFn: async (): Promise<number | null> => {
    const { limit } = await rpc<{ limit: number | string | null }>('get_admin_sg_giving_limit')
    return limit === null ? null : Number(limit)
  },
})

/** Super admin only (the RPC refuses everyone else). null removes the limit. */
export async function setGivingLimit(limit: number | null): Promise<void> {
  await rpc('set_support_group_giving_limit', { p_limit: limit })
}

interface NameChangeJson {
  group_id: string
  name: string
  pending_name: string
  requested_at: string
  state: string | null
  leader_name: string | null
  same_name_groups: number
}

/** Verified groups whose leader asked for a new name (in the staff member's scope). */
export const nameChangesQuery = queryOptions({
  queryKey: directorateKeys.settings('names'),
  queryFn: async (): Promise<NameChange[]> => (await rpc<NameChangeJson[]>('get_admin_sg_name_changes')).map((row) => ({
    groupId: row.group_id,
    name: row.name,
    pendingName: row.pending_name,
    requestedAt: row.requested_at,
    state: row.state ?? undefined,
    leaderName: row.leader_name ?? 'The leader',
    sameNameGroups: Number(row.same_name_groups),
  })),
})

/** Approve renames the group; decline keeps the old name. The leader is told either way. */
export async function decideNameChange({ groupId, approve }: { groupId: string; approve: boolean }): Promise<void> {
  await rpc('review_support_group_rename', { p_group_id: groupId, p_approve: approve, p_note: null })
}

