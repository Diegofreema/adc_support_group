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
  body: string
}

export interface MemberDashboard {
  approvedCount: number
  approvedGrowth: number
  groups: MyGroup[]
  activities: MyActivity[]
  notes: LeaderNote[]
  inviteCode: string
}
