import type { Member, Power } from '@/types/domain'

export interface MemberRecord extends Member {
  groupId: string
  activityCount: number
  /** Everything they may do (title defaults plus the leader's ticks). */
  powers: Power[]
  /** The defaults that come with their title or chapter; can't be removed. */
  titlePowers: Power[]
  /** Earned the "Active member" badge (last 60 days). Never shown as a negative. */
  activeMember: boolean
}

/** Filter pill value: a fixed filter or "chapter:<id>". */
export type MemberFilter = 'all' | 'link' | 'excel' | 'executives' | `chapter:${string}`

/** What the roster RPC is asked for. */
export interface RosterQuery {
  filter: MemberFilter
  search: string
  limit: number
  offset: number
}

/** One page of the roster; `leader` is the group's leader, who has no membership row. */
export interface MemberPage {
  total: number
  rows: MemberRecord[]
  leader: MemberRecord | null
}

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

/** How a new account hears about it: email, SMS, or the leader sends the link. */
export type WelcomeChannel = 'email' | 'sms' | 'share'

/** A new person the leader must send their link to (no email, no SMS points). */
export interface WelcomeShare {
  fullName: string
  phone: string
  link: string
  message: string
}

export interface WelcomeSummary {
  email: number
  sms: number
  share: WelcomeShare[]
}

export interface ImportResult {
  added: number
  linked: number
  notAdded: ImportRowIssue[]
  welcome: WelcomeSummary
}

export interface AddedMember {
  fullName: string
  /** null when they already had an account (told in-app). */
  welcome: WelcomeChannel | null
  share: WelcomeShare[]
}
