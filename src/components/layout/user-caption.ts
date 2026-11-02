import type { User } from '@/types/domain'

const ROLE_CAPTION: Record<User['role'], string> = {
  leader: 'Leader',
  member: 'Member',
  directorate: 'Super admin',
}

/** "Leader · Atiku Women Network" */
export function userCaption(user: User): string {
  return [user.title ?? ROLE_CAPTION[user.role], user.activeGroupName].filter(Boolean).join(' · ')
}
