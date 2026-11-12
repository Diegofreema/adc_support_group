import type { RegisterGroupValues } from '../utils/schemas'
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
  /** The group was saved but the photo didn't upload. */
  photoFailed: boolean
}

/** A pending or rejected group, prefilled into the register form for editing. */
export interface RegistrationDraft {
  status: 'pending' | 'rejected'
  photoUrl?: string
  values: Pick<RegisterGroupValues,
    'groupName' | 'category' | 'about' | 'location' | 'level' | 'state' | 'lga' | 'ward' | 'country' | 'city' | 'leaderTitle' | 'cacNumber'>
}
