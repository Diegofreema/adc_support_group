import type { LeaderDashboard, MemberDashboard } from '../types/home.types'
import {
  leaderTodos, myGroups, recentItems, toGroupSummary, toLeaderNote, toMyActivity,
  type ActivityRow, type GroupRow, type MyActivityStats, type MySupportGroup, type NoteRow, type PaymentRow,
  type PeriodStats,
} from '../utils/to-dashboard'
import { rpc } from '@/lib/supabase'
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

const STATS_DAYS = 30
const NO_STATS = { activities: 0, chapters: 0, given: 0 }

/** The last 30 days ("this month"). The RPC refuses unverified groups; they show zeros. */
async function monthStats(group: GroupRow): Promise<LeaderDashboard['month']> {
  if (group.status !== 'verified') return NO_STATS
  const stats = await rpc<PeriodStats>('get_support_group_period_stats', { p_days: STATS_DAYS })
  return { activities: Number(stats.activities), chapters: Number(stats.chapters), given: Number(stats.given) }
}

/** Everything on the leader home screen. A user leads at most one group. */
export async function fetchLeaderDashboard(_groupId: string | undefined): Promise<LeaderDashboard> {
  const mine = await getMine()
  if (!mine.group) throw new Error('You are not leading a group')
  const group = mine.group
  const [{ pending, recent }, month] = await Promise.all([leaderActivity(group), monthStats(group)])
  return {
    group: toGroupSummary(group),
    groups: myGroups(mine),
    todos: leaderTodos(group, pending),
    month,
    recent,
  }
}

const MY_RECENT = 5
const NOTES = 5
const NO_COUNTS: MyActivityStats = { approved: 0, approved_last_30_days: 0, pending: 0, rejected: 0, people_reached: 0 }

/** The member's own latest activities, any status (waiting and sent back too). */
async function myRecentActivities(): Promise<ActivityRow[]> {
  const page = await rpc<Page<ActivityRow>>('get_my_support_group_activities', { p_limit: MY_RECENT }).catch(() => EMPTY_PAGE)
  return page.rows
}

/** Leader posts with the real author's name. */
async function leaderNotes(group: GroupRow) {
  const rows = await rpc<NoteRow[]>('get_support_group_notes', { p_limit: NOTES })
  return rows.map((row) => toLeaderNote(row, group))
}

/** Everything on the member home screen. Activity RPCs refuse unverified groups. */
export async function fetchMemberDashboard(_userId: string): Promise<MemberDashboard> {
  const mine = await getMine()
  const group = mine.group
  const verified = group?.status === 'verified'
  const [counts, own, notes] = await Promise.all([
    verified ? rpc<MyActivityStats>('get_my_support_group_activity_stats') : Promise.resolve(NO_COUNTS),
    verified ? myRecentActivities() : Promise.resolve([]),
    verified && group ? leaderNotes(group) : Promise.resolve([]),
  ])
  return {
    approvedCount: Number(counts.approved),
    approvedGrowth: Number(counts.approved_last_30_days),
    groups: myGroups(mine),
    activities: own.map(toMyActivity),
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
