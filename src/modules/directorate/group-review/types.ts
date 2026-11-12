import type { Group, GroupStatus } from '@/types/domain'

export interface GroupHistoryEntry {
  title: string
  date: string
  by?: string
}

/** One message in the Directorate ↔ leader review thread. */
export interface ReviewMessage {
  id: string
  fromStaff: boolean
  body: string
  authorName: string
  createdAt: string
}

/** A group in the Directorate's lists. */
export interface ListGroup extends Group {
  suspendedReason?: string
  /** When it was verified, rejected or suspended. */
  decidedAt?: string
}

/** A group as the Directorate reviews it. */
export interface ReviewGroup extends ListGroup {
  leaderPhoneChecked: boolean
  membersByLink: number
  membersByExcel: number
  history: GroupHistoryEntry[]
  /** The review thread, oldest first. */
  messages: ReviewMessage[]
  /** Name, location and size of the group this may duplicate. */
  duplicate?: { id: string; name: string; place: string; memberCount: number }
}

export type GroupTab = GroupStatus

export interface GroupFilterValues extends Record<string, string> {
  search: string
  state: string
  category: string
}

/** One line of a group's audit history (leader, executive, member or staff action). */
export interface GroupAuditEntry {
  id: string
  action: string
  actorName: string
  actorIsStaff: boolean
  /** "Secretary", "Chairman"…; none for plain members and staff. */
  actorTitle?: string
  /** Who or what was acted on, when the backend can still name it. */
  targetName?: string
  details: Record<string, unknown>
  at: string
}
