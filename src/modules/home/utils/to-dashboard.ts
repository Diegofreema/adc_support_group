import { formatNumber } from '@/lib/format'
import type { ActivityStatus, GroupStatus, MemberRole } from '@/types/domain'
import type { GroupReview, GroupSummary, LeaderNote, MyActivity, MyGroup, RecentItem, TodoItem } from '../types/home.types'
import { dayLabel, shortAgo } from './day-label'

/** get_my_support_group (only the fields home reads). */
export interface MySupportGroup {
  is_leader: boolean
  group: {
    id: string
    name: string
    status: GroupStatus
    join_code: string
    leader_profile_id: string
    leader_name: string | null
    member_count: number
    member_growth: number
    chapter_count: number
    activity_count: number
    amount_given: number
    review_note: string | null
  } | null
  membership: { member_role: Exclude<MemberRole, 'leader'>; chapter_name: string | null } | null
}

export type GroupRow = NonNullable<MySupportGroup['group']>

export interface ActivityRow {
  id: string
  title: string
  type: string
  occurred_on: string
  people_reached: number
  status: ActivityStatus
  logged_by: string
  approved_at: string | null
  rejection_reason: string | null
  group_name: string
  chapter_name: string | null
  created_at: string
}

export interface PaymentRow {
  id: string
  cause_title: string | null
  purpose: string | null
  amount: number
  paid_on: string | null
  created_at: string
}

/** get_support_group_notes */
export interface NoteRow {
  id: string
  title: string
  body: string
  is_pinned: boolean
  author_name: string | null
  created_at: string
}

/** get_support_group_period_stats */
export interface PeriodStats {
  activities: number
  people_reached: number
  chapters: number
  given: number
  members_joined: number
}

/** get_my_support_group_activity_stats */
export interface MyActivityStats {
  approved: number
  approved_last_30_days: number
  pending: number
  rejected: number
  people_reached: number
}

export function toGroupSummary(group: GroupRow): GroupSummary {
  return {
    id: group.id, name: group.name, status: group.status, joinCode: group.join_code,
    memberCount: Number(group.member_count), memberGrowth: Number(group.member_growth),
  }
}

export function myGroups(mine: MySupportGroup): MyGroup[] {
  if (!mine.group) return []
  const role: MemberRole = mine.is_leader ? 'leader' : mine.membership?.member_role ?? 'member'
  return [{ id: mine.group.id, name: mine.group.name, role, chapterName: mine.membership?.chapter_name ?? undefined }]
}

export function leaderTodos(group: GroupRow, pendingActivities: number): TodoItem[] {
  const todos: TodoItem[] = []
  if (group.status === 'pending') todos.push({ id: 'verify', kind: 'verify-pending', count: 0, to: '/group' })
  if (pendingActivities > 0) todos.push({ id: 'approve', kind: 'approve-activities', count: pendingActivities, to: '/activities' })
  return todos
}

function activityItem(row: ActivityRow): RecentItem & { at: string } {
  return {
    id: row.id, kind: 'activity', title: row.title, activityType: row.type, status: row.status,
    meta: `${dayLabel(row.occurred_on)} · ${formatNumber(Number(row.people_reached))} people`,
    to: `/activities/${row.id}`, at: row.created_at,
  }
}

function paymentItem(row: PaymentRow): RecentItem & { at: string } {
  return {
    id: row.id, kind: 'payment', title: row.cause_title ?? row.purpose ?? 'Payment', amount: Number(row.amount),
    meta: `${dayLabel(row.paid_on ?? row.created_at)} · Payment`, to: `/payments/${row.id}`, at: row.created_at,
  }
}

/** Newest activities and payments, mixed. */
export function recentItems(activities: ActivityRow[], payments: PaymentRow[], limit: number): RecentItem[] {
  return [...activities.map(activityItem), ...payments.map(paymentItem)]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, limit)
    .map(({ at: _at, ...item }) => item as RecentItem)
}

export function toMyActivity(row: ActivityRow): MyActivity {
  return {
    id: row.id, title: row.title, activityType: row.type, status: row.status,
    meta: `${dayLabel(row.occurred_on)} · ${row.chapter_name ?? row.group_name}`,
    reason: row.rejection_reason ?? undefined,
  }
}

export function toLeaderNote(row: NoteRow, group: GroupRow): LeaderNote {
  const author = row.author_name ?? 'Group leaders'
  return { id: row.id, author, groupName: group.name, time: shortAgo(row.created_at), title: row.title, body: row.body, pinned: row.is_pinned }
}

/** get_my_support_group_review (only the fields the waiting page reads). */
export interface ReviewRow {
  id: string
  name: string
  status: GroupStatus
  submitted_at: string | null
  created_at: string
  reviewed_at: string | null
  review_note: string | null
  waiting_for_reply: boolean
  messages: { id: string; from_staff: boolean; body: string; author_name: string | null; created_at: string }[]
}

export function toGroupReview(row: ReviewRow): GroupReview {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    submittedAt: row.submitted_at ?? row.created_at,
    reviewedAt: row.reviewed_at ?? undefined,
    reviewNote: row.review_note ?? undefined,
    waitingForReply: Boolean(row.waiting_for_reply),
    messages: (row.messages ?? []).map((message) => ({
      id: message.id,
      fromStaff: message.from_staff,
      author: message.author_name ?? (message.from_staff ? 'The Directorate' : 'You'),
      body: message.body,
      at: message.created_at,
    })),
  }
}
