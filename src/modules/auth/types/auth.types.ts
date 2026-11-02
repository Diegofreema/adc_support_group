import type { GroupStatus } from '@/types/domain'

/** What a join link points to. */
export interface Invite {
  code: string
  groupId: string
  groupName: string
  chapterName?: string
  status: GroupStatus
  memberCount: number
  invitedBy: string
}

export type LoginMethod = 'phone' | 'email'

export interface RegistrationReceipt {
  groupName: string
  submittedAt: string
}
