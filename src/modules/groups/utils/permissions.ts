import type { User } from '@/types/domain'

/** Leaders (and later executives) manage links, executives and hand-over. */
export function canManageGroup(user: User): boolean {
  return user.role === 'leader'
}
