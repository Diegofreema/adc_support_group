export type ExportSubject = 'groups' | 'members' | 'activities' | 'payments'

export interface ExportSpec {
  subject: ExportSubject
  state: string
  /** Category id, or "" for all. */
  category: string
  period: string
}

export interface ExportRecord {
  id: string
  label: string
  spec: ExportSpec
  rows: number
  createdAt: string
}

export interface ExportTable {
  headers: string[]
  rows: (string | number | null | undefined)[][]
}

export interface ReportTotals {
  groups: number
  members: number
  activities: number
  peopleReached: number
  amountPaid: number
}

export type DepartureKind = 'left' | 'deletion'
export type DepartureFilter = 'all' | DepartureKind
/** 'left' | 'details_deleted' for leavers; 'pending' | 'cancelled' | 'done' for deletion requests. */
export type DepartureStatus = 'left' | 'details_deleted' | 'pending' | 'cancelled' | 'done'

/** Someone who left a group or asked for their account to be deleted. */
export interface Departure {
  key: string
  kind: DepartureKind
  name: string
  groupId?: string
  groupName?: string
  state?: string
  status: DepartureStatus
  at: string
  /** When a pending deletion runs. */
  dueAt?: string
}
