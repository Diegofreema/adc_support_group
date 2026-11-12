import type { MyGroup } from '@/modules/home'

export interface Profile {
  fullName: string
  phone: string
  email: string
  /** The email was confirmed with a code, so it also signs them in. */
  emailConfirmed: boolean
  state: string
  lga: string
  ward: string
  groups: MyGroup[]
  isLeader: boolean
  /** Set while a "delete my details" request waits its 7 days. */
  pendingDeletion: PendingDeletion | null
}

export interface PendingDeletion {
  requestedAt: string
  dueAt: string
}

/** Numbers shown in the "More" menu. */
export interface MenuCounts {
  members: number
  chapters: number
}
