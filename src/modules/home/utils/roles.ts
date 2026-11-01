import type { MemberRole } from '@/types/domain'

const ROLE_LABEL: Record<MemberRole, string> = {
  leader: 'Leader',
  executive: 'Executive',
  coordinator: 'Coordinator',
  member: 'Member',
}

/** "Member · Kano chapter" */
export function groupRoleLine(role: MemberRole, chapterName?: string): string {
  return [ROLE_LABEL[role], chapterName].filter(Boolean).join(' · ')
}
