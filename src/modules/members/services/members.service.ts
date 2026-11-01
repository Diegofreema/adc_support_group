import { memberChapters, membersDb } from './members.mock'
import type { ChapterOption, MemberRecord, NewMemberInput } from '../types'
import { normalisePhone } from '../utils/phone'
import { newId, notFound, respond } from '@/lib/mock-api'

function findMember(memberId: string): MemberRecord {
  return membersDb.find((member) => member.id === memberId) ?? notFound('Member', memberId)
}

function chapterName(groupId: string, chapterId?: string): string | undefined {
  return memberChapters[groupId]?.find((chapter) => chapter.id === chapterId)?.name
}

export async function fetchMembers(groupId: string): Promise<MemberRecord[]> {
  return respond(membersDb.filter((member) => member.groupId === groupId))
}

export async function fetchChapterOptions(groupId: string): Promise<ChapterOption[]> {
  return respond(memberChapters[groupId] ?? [])
}

/** Find a member of this group by name or phone (for "add executive", etc.). */
export function matchMember(groupId: string, query: string): MemberRecord | undefined {
  const needle = query.trim().toLowerCase()
  const phone = normalisePhone(query)
  return membersDb.find((member) => member.groupId === groupId && (member.fullName.toLowerCase() === needle || member.phone === phone))
}

export async function addMember(groupId: string, input: NewMemberInput): Promise<MemberRecord> {
  const member: MemberRecord = {
    ...input, id: newId('mem'), groupId, phone: normalisePhone(input.phone), role: 'member', joinedVia: 'manual',
    chapterName: chapterName(groupId, input.chapterId), activityCount: 0, joinedAt: new Date().toISOString(),
  }
  membersDb.unshift(member)
  return respond(member)
}

export async function makeExecutive(memberId: string, title = 'Executive'): Promise<MemberRecord> {
  const member = findMember(memberId)
  Object.assign(member, { role: 'executive', title })
  return respond(member)
}

export async function addExecutiveByQuery(groupId: string, query: string, title: string): Promise<MemberRecord> {
  const member = matchMember(groupId, query)
  if (!member) throw new Error('No member with that name or phone')
  return makeExecutive(member.id, title)
}

export async function moveMember(memberId: string, chapterId: string): Promise<MemberRecord> {
  const member = findMember(memberId)
  Object.assign(member, { chapterId, chapterName: chapterName(member.groupId, chapterId) })
  return respond(member)
}

export async function removeMember(memberId: string): Promise<{ removed: string }> {
  const index = membersDb.findIndex((member) => member.id === memberId)
  if (index < 0) notFound('Member', memberId)
  membersDb.splice(index, 1)
  return respond({ removed: memberId })
}
