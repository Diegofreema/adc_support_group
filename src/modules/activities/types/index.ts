import type { LucideIcon } from 'lucide-react'

import type { ActivityTypeId } from '@/config/activity-types'
import type { Activity, PaymentStatus } from '@/types/domain'

export type { ActivityTypeId }

export type ActivityTab = 'all' | 'review' | 'mine'

export type RejectReasonId = 'unclear-photos' | 'missing-count' | 'wrong-place' | 'duplicate' | 'other'

/** An enabled activity type (slug from the backend, icon from config). */
export interface ActivityTypeOption {
  value: string
  label: string
  icon: LucideIcon
}

export interface LinkedPayment {
  id: string
  title: string
  amount: number
  date: string
  status: PaymentStatus
}

/** Activity as shown on the detail screen. */
export interface ActivityDetail extends Activity {
  linkedPayment?: LinkedPayment
}

export interface ActivityDetailsInput {
  title: string
  /** YYYY-MM-DD */
  date: string
  peopleReached: number
  state: string
  lga: string
  ward: string
  note?: string
}

export interface NewActivityInput extends ActivityDetailsInput {
  /** Activity type slug. */
  type: string
  photos: File[]
  videoUrl?: string
}

export interface RejectInput {
  reason: RejectReasonId
  note?: string
}

/** A photo picked in the wizard, with a local preview URL. */
export interface PickedPhoto {
  file: File
  preview: string
}
