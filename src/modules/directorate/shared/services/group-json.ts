import type { Group, GroupLevel, GroupStatus } from '@/types/domain'

/** private.support_group_json plus the admin extras (leader phone, duplicate hint). */
export interface GroupJson {
  id: string
  name: string
  join_code: string
  status: GroupStatus
  level: GroupLevel | null
  category_id: string | null
  category: string | null
  state: string | null
  lga: string | null
  ward: string | null
  country: string | null
  city: string | null
  cac_number: string | null
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
  /** When the Directorate last decided (verified, rejected or suspended). */
  reviewed_at?: string | null
  possible_duplicate_of?: { id: string; name: string } | null
}

/** Same mapping as the groups module, for the Directorate's view of any group. */
export function toGroup(json: GroupJson): Group {
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
    memberCount: Number(json.member_count),
    memberGrowth: Number(json.member_growth ?? 0),
    chapterCount: Number(json.chapter_count),
    activityCount: Number(json.activity_count),
    amountGiven: Number(json.amount_given),
    leaderName: json.leader_name ?? '',
    leaderPhone: json.leader_phone ?? '',
    cacNumber: json.cac_number ?? undefined,
    joinCode: json.join_code,
    submittedAt: json.submitted_at ?? json.created_at,
    possibleDuplicateOf: json.possible_duplicate_of?.name,
    rejectionReason: json.review_note ?? undefined,
  }
}

export interface GroupListArgs {
  status?: GroupStatus
  search?: string
  state?: string
  categoryId?: string
}

/** get_admin_sg_groups arguments; empty filters mean "any". */
export function groupListArgs(args: GroupListArgs, limit: number, offset: number): Record<string, unknown> {
  return {
    p_status: args.status ?? null,
    p_search: args.search?.trim() || null,
    p_state: args.state || null,
    p_category_id: args.categoryId || null,
    p_limit: limit,
    p_offset: offset,
  }
}
