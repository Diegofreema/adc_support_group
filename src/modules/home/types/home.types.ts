import type { ActivityStatus, GroupStatus, MemberRole } from '@/types/domain'

export type TodoKind = 'approve-activities' | 'fix-upload' | 'verify-pending'

export interface TodoItem {
  id: string
  kind: TodoKind
  count: number
  to: string
}

export type RecentItem =
  | { id: string; kind: 'activity'; title: string; meta: string; activityType: string; status: ActivityStatus; to: string }
  | { id: string; kind: 'payment'; title: string; meta: string; amount: number; to: string }

export interface GroupSummary {
  id: string
  name: string
  status: GroupStatus
  memberCount: number
  memberGrowth: number
  joinCode: string
}

export interface MyGroup {
  id: string
  name: string
  role: MemberRole
  chapterName?: string
}

export interface LeaderDashboard {
  group: GroupSummary
  /** Groups the leader can switch between. */
  groups: MyGroup[]
  todos: TodoItem[]
  /** The last 30 days: approved activities, new chapters, amount paid. */
  month: { activities: number; chapters: number; given: number }
  recent: RecentItem[]
}

export interface MyActivity {
  id: string
  title: string
  meta: string
  activityType: string
  status: ActivityStatus
  reason?: string
}

export interface LeaderNote {
  id: string
  author: string
  groupName: string
  time: string
  title: string
  body: string
  pinned: boolean
}

export interface MemberDashboard {
  approvedCount: number
  approvedGrowth: number
  groups: MyGroup[]
  activities: MyActivity[]
  notes: LeaderNote[]
  inviteCode: string
}

/** One message between the Directorate and a waiting leader. */
export interface ReviewMessage {
  id: string
  fromStaff: boolean
  author: string
  body: string
  at: string
}

/** The leader's "Waiting for the Directorate" page (get_my_support_group_review). */
export interface GroupReview {
  id: string
  name: string
  status: GroupStatus
  submittedAt: string
  reviewedAt?: string
  /** Rejection (or suspension) reason. */
  reviewNote?: string
  messages: ReviewMessage[]
  /** The Directorate wrote last and is waiting for the leader. */
  waitingForReply: boolean
}

/** A member or leader whose group can't be used right now (suspended). */
export interface GroupNotice {
  name: string
  status: GroupStatus
  reason?: string
}
