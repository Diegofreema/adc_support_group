import type { Group, GroupStatus } from '@/types/domain'

export interface GroupHistoryEntry {
  title: string
  date: string
  by?: string
}

/** A group as the Directorate reviews it. */
export interface ReviewGroup extends Group {
  leaderPhoneChecked: boolean
  membersByLink: number
  membersByExcel: number
  history: GroupHistoryEntry[]
  /** Name, location and size of the verified group this may duplicate. */
  duplicate?: { id: string; name: string; place: string; memberCount: number }
  suspendedReason?: string
  decidedAt?: string
}

export type GroupTab = GroupStatus

export interface GroupFilterValues extends Record<string, string> {
  search: string
  state: string
  category: string
}
