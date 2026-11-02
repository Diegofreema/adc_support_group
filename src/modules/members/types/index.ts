import type { Member } from '@/types/domain'

export interface MemberRecord extends Member {
  groupId: string
  activityCount: number
}

/** Filter pill value: a fixed filter or "chapter:<id>". */
export type MemberFilter = 'all' | 'link' | 'excel' | 'executives' | `chapter:${string}`

export interface ChapterOption {
  id: string
  name: string
  joinCode: string
}

export interface NewMemberInput {
  fullName: string
  phone: string
  state: string
  lga: string
  ward: string
  email?: string
  chapterId?: string
}

/** Fields every uploaded row must map to. */
export type ImportField = 'fullName' | 'phone' | 'state' | 'lga' | 'ward'
export type ColumnMapping = Record<ImportField, string>

export interface ParsedSheet {
  fileName: string
  headers: string[]
  rows: Record<string, string>[]
}

export interface ImportRowIssue {
  row: number
  name: string
  reason: string
}

export interface ImportCheck {
  total: number
  ready: number
  issues: ImportRowIssue[]
}

export interface ImportResult {
  added: number
  linked: number
  notAdded: ImportRowIssue[]
}
