import type { LeaderDashboard, MemberDashboard } from '../types/home.types'
import {
  leaderTodos, myGroups, recentItems, toGroupSummary, toLeaderNote, toMyActivity,
  type ActivityRow, type GroupRow, type MySupportGroup, type PaymentRow, type UpdateRow,
} from '../utils/to-dashboard'
import { rpc, supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'

interface Page<Row> {
  total: number
  rows: Row[]
}

const EMPTY_PAGE = { total: 0, rows: [] }
const RECENT = 4

function getMine(): Promise<MySupportGroup> {
  return rpc<MySupportGroup>('get_my_support_group')
}

/** Activities and payments only exist for verified groups (the RPCs refuse otherwise). */
function activities(args: Record<string, unknown>): Promise<Page<ActivityRow>> {
  return rpc<Page<ActivityRow>>('get_support_group_activities', args)
}

function payments(limit: number): Promise<Page<PaymentRow>> {
  return rpc<Page<PaymentRow>>('get_support_group_payments', { p_limit: limit })
}

async function leaderActivity(group: GroupRow) {
  if (group.status !== 'verified') return { pending: 0, recent: [] }
  const [pending, latest, paid] = await Promise.all([
    activities({ p_status: 'pending', p_limit: 1 }),
    activities({ p_limit: RECENT }),
    payments(RECENT),
  ])
  return { pending: Number(pending.total), recent: recentItems(latest.rows, paid.rows, RECENT) }
}

/** Everything on the leader home screen. A user leads at most one group. */
export async function fetchLeaderDashboard(_groupId: string | undefined): Promise<LeaderDashboard> {
  const mine = await getMine()
  if (!mine.group) throw new Error('You are not leading a group')
  const group = mine.group
  const { pending, recent } = await leaderActivity(group)
  return {
    group: toGroupSummary(group),
    groups: myGroups(mine),
    todos: leaderTodos(group, pending),
    totals: { activities: Number(group.activity_count), chapters: Number(group.chapter_count), given: Number(group.amount_given) },
    recent,
  }
}

const MY_ACTIVITIES = 100
const GROWTH_DAYS = 30

/** Members see approved activities plus their own; keep their own. */
async function myActivities(userId: string, verified: boolean): Promise<ActivityRow[]> {
  if (!verified) return []
  const page = await activities({ p_limit: MY_ACTIVITIES }).catch(() => EMPTY_PAGE)
  return page.rows.filter((row) => row.logged_by === userId)
}

async function leaderNotes(group: GroupRow) {
  const { data, error } = await supabase
    .from('support_group_updates')
    .select('id, title, body, is_pinned, created_at, author_profile_id')
    .eq('group_id', group.id)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5)
  if (error) throw new Error(error.message)
  return (data as UpdateRow[]).map((row) => toLeaderNote(row, group))
}

function approvedSince(rows: ActivityRow[], days: number): number {
  const since = Date.now() - days * 86_400_000
  return rows.filter((row) => row.status === 'approved' && row.approved_at && new Date(row.approved_at).getTime() > since).length
}

/** Everything on the member home screen. */
export async function fetchMemberDashboard(userId: string): Promise<MemberDashboard> {
  const mine = await getMine()
  const group = mine.group
  const [own, notes] = await Promise.all([
    myActivities(userId, group?.status === 'verified'),
    group ? leaderNotes(group) : Promise.resolve([]),
  ])
  return {
    approvedCount: own.filter((row) => row.status === 'approved').length,
    approvedGrowth: approvedSince(own, GROWTH_DAYS),
    groups: myGroups(mine),
    activities: own.slice(0, 5).map(toMyActivity),
    notes,
    inviteCode: group?.join_code ?? '',
  }
}

/**
 * A user belongs to one group, so "switching" only re-selects it. Kept so the
 * dialog works the same if more groups arrive later.
 */
export async function switchActiveGroup(group: { id: string; name: string }): Promise<void> {
  const user = sessionStore.getUser()
  if (!user) return
  sessionStore.setUser({ ...user, activeGroupId: group.id, activeGroupName: group.name })
}
