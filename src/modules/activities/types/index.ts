import type { ActivityTypeId } from '@/config/activity-types'
import type { Activity, PhotoTone } from '@/types/domain'

export type { ActivityTypeId }

export type ActivityTab = 'all' | 'review' | 'mine'

export type RejectReasonId = 'unclear-photos' | 'missing-count' | 'wrong-place' | 'duplicate' | 'other'

export interface LinkedPayment {
  id: string
  title: string
  amount: number
  date: string
}

/** Activity as shown on the detail screen. */
export interface ActivityDetail extends Activity {
  linkedPayment?: LinkedPayment
}

export interface ActivityDetailsInput {
  title: string
  date: string
  peopleReached: number
  state: string
  lga: string
  ward: string
  note?: string
}

export interface NewActivityInput extends ActivityDetailsInput {
  type: ActivityTypeId
  photoTones: PhotoTone[]
  videoUrl?: string
}

export interface RejectInput {
  reason: RejectReasonId
  note?: string
}
