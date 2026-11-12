import { rpc } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { Group, GroupLevel, GroupStatus } from '@/types/domain'

/** private.support_group_json, as returned by the group RPCs. */
export interface GroupJson {
  id: string
  name: string
  join_code: string
  status: GroupStatus
  level: GroupLevel | null
  category: string | null
  state: string | null
  lga: string | null
  ward: string | null
  country: string | null
  city: string | null
  cac_number: string | null
  photo_url?: string | null
  leader_profile_id: string
  leader_name: string | null
  leader_phone?: string | null
  member_count: number
  member_growth?: number
  chapter_count: number
  activity_count: number
  amount_given: number | string
  submitted_at: string | null
  created_at: string
  review_note: string | null
  possible_duplicate_of?: { id: string; name: string } | null
}

export function toGroup(json: GroupJson): Group {
  const viewer = sessionStore.getUser()
  return {
    id: json.id,
    name: json.name,
    category: json.category ?? 'Other',
    level: json.level ?? 'national',
    status: json.status,
    state: json.state ?? undefined,
    lga: json.lga ?? undefined,
    ward: json.ward ?? undefined,
    country: json.country ?? undefined,
    city: json.city ?? undefined,
    memberCount: json.member_count,
    memberGrowth: json.member_growth ?? 0,
    chapterCount: json.chapter_count,
    activityCount: json.activity_count,
    amountGiven: Number(json.amount_given),
    leaderName: json.leader_name ?? '',
    // Members see their leader's name only; the leader sees their own number.
    leaderPhone: json.leader_phone ?? (viewer?.id === json.leader_profile_id ? viewer.phone : ''),
    cacNumber: json.cac_number ?? undefined,
    photoUrl: json.photo_url ?? undefined,
    joinCode: json.join_code,
    submittedAt: json.submitted_at ?? json.created_at,
    possibleDuplicateOf: json.possible_duplicate_of?.name,
    rejectionReason: json.review_note ?? undefined,
  }
}

/** The caller's own group (leaders and members only ever see theirs). */
export async function fetchGroup(groupId: string): Promise<Group> {
  const mine = await rpc<{ group: GroupJson | null }>('get_my_support_group')
  if (!mine.group || mine.group.id !== groupId) throw new Error('Group not found')
  return toGroup(mine.group)
}

/** Replace the join code; the old link stops working. */
export async function regenerateJoinCode(groupId: string): Promise<Group> {
  await rpc<string>('regenerate_support_group_join_code')
  return fetchGroup(groupId)
}

interface RosterMatch {
  profile_id: string
  full_name: string
}

/**
 * Ask the Directorate to move leadership to a member, found by name or phone.
 * The new leader must already be in the group.
 */
export async function requestHandover(_groupId: string, newLeader: string): Promise<{ requested: true }> {
  const query = newLeader.trim()
  if (!query) throw new Error('Enter the new leader')
  const { rows } = await rpc<{ rows: RosterMatch[] }>('get_support_group_roster', { p_search: query, p_limit: 5 })
  if (rows.length === 0) throw new Error('No member matches that name or phone')
  const exact = rows.filter((row) => row.full_name.toLowerCase() === query.toLowerCase())
  const target = rows.length === 1 ? rows[0] : exact.length === 1 ? exact[0] : undefined
  if (!target) throw new Error('Several members match. Use their phone number')
  await rpc('request_support_group_handover', { p_to_profile_id: target.profile_id })
  return { requested: true }
}
