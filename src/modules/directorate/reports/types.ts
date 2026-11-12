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
