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

function matchesFilter(member: MemberRecord, filter: MemberFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'link' || filter === 'excel') return member.joinedVia === filter
  if (filter === 'executives') return member.role === 'leader' || member.role === 'executive'
  return member.chapterId === filter.slice('chapter:'.length)
}

function matchesSearch(member: MemberRecord, search: string): boolean {
  const needle = search.trim().toLowerCase()
  if (!needle) return true
  const digits = needle.replace(/\D/g, '')
  return member.fullName.toLowerCase().includes(needle) || (digits.length > 2 && member.phone.includes(digits))
}

export function filterMembers(members: MemberRecord[], filter: MemberFilter, search: string): MemberRecord[] {
  return members.filter((member) => matchesFilter(member, filter) && matchesSearch(member, search))
}

/** Leader first, then executives in the order they were added. */
export function selectExecutives(members: MemberRecord[]): MemberRecord[] {
  const leader = members.filter((member) => member.role === 'leader')
  const executives = members.filter((member) => member.role === 'executive')
  return [...leader, ...executives]
}
