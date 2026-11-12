import type { Group, GroupStatus } from '@/types/domain'

export interface GroupHistoryEntry {
  title: string
  date: string
  by?: string
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
  /** Name, location and size of the group this may duplicate. */
  duplicate?: { id: string; name: string; place: string; memberCount: number }
}

export type GroupTab = GroupStatus

export interface GroupFilterValues extends Record<string, string> {
  search: string
  state: string
  category: string
}
