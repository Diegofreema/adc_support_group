import type { PillOption } from '@/components/shared'
import type { ChapterOption, MemberFilter, MemberRecord } from '../types'

const FIXED_FILTERS: PillOption<MemberFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'link', label: 'Link' },
  { value: 'excel', label: 'Excel' },
  { value: 'executives', label: 'Executives' },
]

/** Fixed pills plus one pill per chapter. */
export function buildFilterOptions(chapters: ChapterOption[]): PillOption<MemberFilter>[] {
  const chapterPills = chapters.map((chapter) => ({ value: `chapter:${chapter.id}` as const, label: chapter.name }))
  return [...FIXED_FILTERS, ...chapterPills]
}

function matchesSearch(member: MemberRecord, search: string): boolean {
  const needle = search.trim().toLowerCase()
  if (!needle) return true
  const digits = needle.replace(/\D/g, '')
  return member.fullName.toLowerCase().includes(needle) || (digits.length > 2 && member.phone.includes(digits))
}

/**
 * The search text sent to the roster RPC. A phone number is cut to its
 * national digits ("0803 555…" → "803555…") so it matches however it's stored.
 */
export function rosterSearch(search: string): string {
  const trimmed = search.trim()
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 4 || !/^[\d\s+()-]+$/.test(trimmed)) return trimmed
  return digits.replace(/^(234|0)/, '')
}

/** The leader has no membership row, so they're added on top when the filter and search would include them. */
export function showsLeader(leader: MemberRecord, filter: MemberFilter, search: string): boolean {
  return (filter === 'all' || filter === 'executives') && matchesSearch(leader, search)
}

/** Leader first, then executives (coordinators run chapters and aren't listed here). */
export function selectExecutives(leader: MemberRecord | null, members: MemberRecord[]): MemberRecord[] {
  const executives = members.filter((member) => member.role === 'executive')
  return leader ? [leader, ...executives] : executives
}
