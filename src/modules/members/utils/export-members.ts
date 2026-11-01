import type { MemberRecord } from '../types'
import { toCsv } from './csv'

const JOINED_LABEL: Record<MemberRecord['joinedVia'], string> = { link: 'Link', excel: 'Excel', manual: 'Added' }

export function joinedViaLabel(joinedVia: MemberRecord['joinedVia']): string {
  return JOINED_LABEL[joinedVia]
}

export function membersToCsv(members: MemberRecord[]): string {
  const rows = members.map((member) => [member.fullName, member.phone, member.state ?? '', member.lga ?? '', member.ward ?? '', member.chapterName ?? '', joinedViaLabel(member.joinedVia)])
  return toCsv(['Full name', 'Phone', 'State', 'LGA', 'Ward', 'Chapter', 'Joined by'], rows)
}
