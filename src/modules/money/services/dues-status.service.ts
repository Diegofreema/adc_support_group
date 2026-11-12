import { rpc } from '@/lib/supabase'
import type { DuesFilter, DuesStatusPage, MemberOption } from '../types'

type Num = number | string

interface DuesStatusJson {
  period: string
  label: string
  paid_count: Num
  member_count: Num
  total: Num
  rows: { profile_id: string; full_name: string | null; phone: string | null; paid: boolean }[]
}

/** Rows per "Load more". */
export const DUES_STATUS_PAGE_SIZE = 50

/** Money power: who has paid this period. Coordinators see their chapter. */
export async function listDuesStatusPage(period: string | undefined, filter: DuesFilter, search: string, offset: number): Promise<DuesStatusPage> {
  const page = await rpc<DuesStatusJson>('get_support_group_dues_status', {
    p_period: period ?? null,
    p_filter: filter,
    p_search: search.trim() || null,
    p_limit: DUES_STATUS_PAGE_SIZE,
    p_offset: offset,
  })
  return {
    period: page.period,
    label: page.label,
    paidCount: Number(page.paid_count),
    memberCount: Number(page.member_count),
    total: Number(page.total),
    rows: page.rows.map((row) => ({ profileId: row.profile_id, name: row.full_name ?? 'Member', phone: row.phone ?? undefined, paid: row.paid })),
  }
}

const MEMBER_MATCHES = 8

interface RosterPerson { profile_id: string; full_name: string | null; phone: string | null }

/** The roster lists the leader apart from the members; they pay dues too. */
function leaderMatches(leader: RosterPerson | null, search: string): boolean {
  if (!leader) return false
  const needle = search.trim().toLowerCase()
  const digits = needle.replace(/\D/g, '')
  return (leader.full_name ?? '').toLowerCase().includes(needle) || (digits.length >= 4 && (leader.phone ?? '').includes(digits))
}

/** Find a member, or the leader, by name or phone (for "who paid"). */
export async function searchMembers(search: string): Promise<MemberOption[]> {
  const { rows, leader } = await rpc<{ rows: RosterPerson[]; leader: RosterPerson | null }>('get_support_group_roster', {
    p_search: search.trim() || null,
    p_limit: MEMBER_MATCHES,
    p_offset: 0,
  })
  const people = leaderMatches(leader, search) ? [leader!, ...rows] : rows
  return people.map((row) => ({ id: row.profile_id, name: row.full_name ?? 'Member', phone: row.phone ?? undefined }))
}
