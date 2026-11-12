import type {
  AddedMember, ChapterOption, MemberFilter, MemberPage, MemberRecord, NewMemberInput, RosterQuery, WelcomeChannel, WelcomeShare, WelcomeSummary,
} from '../types'
import { invokeFunction } from '@/lib/edge-functions'
import { normalisePhone } from '@/lib/phone'
import { rpc } from '@/lib/supabase'
import type { JoinedVia, MemberRole, Power } from '@/types/domain'
import { rosterSearch, showsLeader } from '../utils/filters'
import { ALL_POWERS } from '../utils/powers'

/** One row of get_support_group_roster (scoped by the backend to what the viewer may see). */
interface RosterRow {
  profile_id: string
  full_name: string
  phone: string | null
  email: string | null
  state: string | null
  lga: string | null
  ward: string | null
  member_role: Exclude<MemberRole, 'leader'>
  title: string | null
  chapter_id: string | null
  chapter_name: string | null
  joined_via: JoinedVia | 'request'
  joined_at: string
  activity_count: number
  powers: Power[] | null
  title_powers: Power[] | null
  active_member: boolean | null
}

interface LeaderJson {
  profile_id: string
  full_name: string
  phone: string | null
  email: string | null
  title: string | null
}

interface RosterJson {
  total: number
  rows: RosterRow[]
  leader: LeaderJson | null
}

/** The RPC's own cap on one call; used for full loads (CSV export). */
const MAX_PAGE = 500

const cleanEmail = (email: string | null): string | undefined => (email && !email.endsWith('.local') ? email : undefined)

function toMember(groupId: string, row: RosterRow): MemberRecord {
  return {
    id: row.profile_id,
    groupId,
    fullName: row.full_name,
    phone: row.phone ? normalisePhone(row.phone) : '',
    email: cleanEmail(row.email),
    state: row.state ?? undefined,
    lga: row.lga ?? undefined,
    ward: row.ward ?? undefined,
    role: row.member_role,
    title: row.title ?? undefined,
    chapterId: row.chapter_id ?? undefined,
    chapterName: row.chapter_name ?? undefined,
    // Rise Up's old "request" joins read as link joins here.
    joinedVia: row.joined_via === 'request' ? 'link' : row.joined_via,
    joinedAt: row.joined_at,
    activityCount: Number(row.activity_count),
    powers: row.powers ?? [],
    titlePowers: row.title_powers ?? [],
    activeMember: row.active_member ?? false,
  }
}

/** The leader has no membership row; the roster names them separately. They hold every power. */
function toLeader(groupId: string, leader: LeaderJson): MemberRecord {
  return {
    id: leader.profile_id, groupId, fullName: leader.full_name,
    phone: leader.phone ? normalisePhone(leader.phone) : '', email: cleanEmail(leader.email),
    role: 'leader', title: leader.title ?? 'Leader', joinedVia: 'manual', joinedAt: '', activityCount: 0,
    powers: [...ALL_POWERS], titlePowers: [...ALL_POWERS], activeMember: false,
  }
}

/** Pill value → the RPC's filter and chapter arguments. */
function filterArgs(filter: MemberFilter): { p_filter: string; p_chapter_id: string | null } {
  if (filter.startsWith('chapter:')) return { p_filter: 'all', p_chapter_id: filter.slice('chapter:'.length) }
  return { p_filter: filter, p_chapter_id: null }
}

/** One page of the roster the viewer may see, filtered and searched by the backend. */
export async function fetchMemberPage(groupId: string, query: RosterQuery): Promise<MemberPage> {
  const page = await rpc<RosterJson>('get_support_group_roster', {
    p_search: rosterSearch(query.search) || null,
    ...filterArgs(query.filter),
    p_limit: query.limit,
    p_offset: query.offset,
  })
  return {
    total: Number(page.total),
    rows: page.rows.map((row) => toMember(groupId, row)),
    leader: page.leader ? toLeader(groupId, page.leader) : null,
  }
}

/** Every member matching the filter and search (CSV export), in pages of 500. The leader leads when they match. */
export async function fetchAllMembers(groupId: string, filter: MemberFilter, search: string): Promise<MemberRecord[]> {
  const members: MemberRecord[] = []
  let leader: MemberRecord | null = null
  for (let offset = 0; ; offset += MAX_PAGE) {
    const page = await fetchMemberPage(groupId, { filter, search, limit: MAX_PAGE, offset })
    leader = page.leader
    members.push(...page.rows)
    if (members.length >= page.total || page.rows.length === 0) break
  }
  return leader && showsLeader(leader, filter, search) ? [leader, ...members] : members
}

interface ChapterRow {
  id: string
  name: string
  join_code: string
}

/** A group still waiting for the Directorate has no chapters yet. */
export async function fetchChapterOptions(_groupId: string): Promise<ChapterOption[]> {
  const chapters = await rpc<ChapterRow[]>('get_support_group_chapters').catch((error: Error) => {
    if (/not been verified/.test(error.message)) return []
    throw error
  })
  return chapters.map((chapter) => ({ id: chapter.id, name: chapter.name, joinCode: chapter.join_code }))
}

export interface AddMembersRow {
  fullName: string
  phone: string
  email?: string
  state?: string
  lga?: string
  ward?: string
  chapterId?: string
}

interface ShareRow {
  row: number
  full_name: string
  phone: string
  link: string
  message: string
}

export interface AddMembersResult {
  added: number
  results: { row: number; phone: string | null; result: string; error?: string; created: boolean; welcome: WelcomeChannel | null }[]
  share: WelcomeShare[]
}

function toShare(row: ShareRow): WelcomeShare {
  return { fullName: row.full_name, phone: row.phone, link: row.link, message: row.message }
}

/**
 * Find or create each person's account and add them (support-group-add-members).
 * New accounts are welcomed by email, else SMS from the leader's points, else
 * listed under `share` for the leader to send themselves.
 */
export async function addMembers(rows: AddMembersRow[], joinedVia: 'excel' | 'manual'): Promise<AddMembersResult> {
  const result = await invokeFunction<Omit<AddMembersResult, 'share'> & { share?: ShareRow[] }>(
    'support-group-add-members', { rows, joinedVia, welcome: 'auto' },
  )
  return { ...result, share: (result.share ?? []).map(toShare) }
}

/** Totals of how new people were told, across one or more calls. */
export function summariseWelcome(calls: AddMembersResult[]): WelcomeSummary {
  const results = calls.flatMap((call) => call.results)
  return {
    email: results.filter((r) => r.welcome === 'email').length,
    sms: results.filter((r) => r.welcome === 'sms').length,
    share: calls.flatMap((call) => call.share),
  }
}

const REFUSALS: Record<string, string> = {
  already_member: 'Already in your group',
  other_group: 'Already in another group',
  leader: 'Leads a group',
  blocked: 'Was removed and blocked',
  duplicate_row: 'Same phone twice',
}

export function refusalReason(result: string, error?: string): string {
  return error ?? REFUSALS[result] ?? 'Could not add'
}

export async function addMember(input: NewMemberInput): Promise<AddedMember> {
  const { results, share } = await addMembers([{ ...input, phone: normalisePhone(input.phone) }], 'manual')
  const outcome = results[0]
  if (!outcome || outcome.result !== 'added') throw new Error(refusalReason(outcome?.result ?? '', outcome?.error))
  return { fullName: input.fullName.trim(), welcome: outcome.welcome ?? null, share }
}

/** Role, title and chapter are set together; this keeps the ones not changing. */
async function setRole(member: MemberRecord, changes: { role?: 'member' | 'executive'; title?: string; chapterId?: string | null }): Promise<void> {
  const role = changes.role ?? (member.role === 'executive' ? 'executive' : 'member')
  await rpc('set_support_group_member_role', {
    p_profile_id: member.id,
    p_role: role,
    p_title: role === 'executive' ? (changes.title ?? member.title ?? 'Executive') : null,
    p_chapter_id: changes.chapterId === undefined ? member.chapterId ?? null : changes.chapterId,
  })
}

export async function makeExecutive(member: MemberRecord, title = 'Executive'): Promise<void> {
  await setRole(member, { role: 'executive', title })
}

/** Find a member of this group by name or phone (for "add executive", etc.). */
export function matchMember(members: MemberRecord[], query: string): MemberRecord | undefined {
  const needle = query.trim().toLowerCase()
  const phone = normalisePhone(query)
  return members.find((member) => member.role !== 'leader' && (member.fullName.toLowerCase() === needle || member.phone === phone))
}

/** Enough to find one person by name or phone among the backend's matches. */
const MATCH_LIMIT = 50

export async function addExecutiveByQuery(groupId: string, query: string, title: string): Promise<void> {
  const matches = await fetchMemberPage(groupId, { filter: 'all', search: query, limit: MATCH_LIMIT, offset: 0 })
  const member = matchMember(matches.rows, query)
  if (!member) throw new Error('No member with that name or phone')
  await makeExecutive(member, title)
}

export async function moveMember(member: MemberRecord, chapterId: string): Promise<void> {
  if (member.role === 'coordinator') throw new Error('Change a coordinator from their chapter page')
  await setRole(member, { chapterId: chapterId || null })
}

export async function removeMember(memberId: string, block = false): Promise<{ removed: string }> {
  await rpc('remove_support_group_member', { p_profile_id: memberId, p_block: block })
  return { removed: memberId }
}

/** Leader only: the extra powers ticked for an executive or coordinator (title defaults are kept). */
export async function setMemberPowers(memberId: string, extraPowers: Power[]): Promise<void> {
  await rpc('set_support_group_member_powers', { p_profile_id: memberId, p_powers: extraPowers })
}
