export type ExportSubject = 'groups' | 'members' | 'activities' | 'payments'
export type ExportFormat = 'excel' | 'csv'

export interface ExportSpec {
  subject: ExportSubject
  state: string
  category: string
  period: string
  format: ExportFormat
}

export interface ExportRecord {
  id: string
  label: string
  format: ExportFormat
  createdAt: string
}
