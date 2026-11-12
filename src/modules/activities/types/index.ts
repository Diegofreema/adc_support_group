import type { LucideIcon } from 'lucide-react'

import type { ActivityTypeId } from '@/config/activity-types'
import type { ShrunkImage } from '@/lib/image'
import type { Activity, ActivityStatus, PaymentStatus } from '@/types/domain'

export type { ActivityTypeId }

export type ActivityTab = 'all' | 'review' | 'mine'

export type RejectReasonId = 'unclear-photos' | 'missing-count' | 'wrong-place' | 'duplicate' | 'other'

/** An enabled activity type (slug from the backend, icon from config). */
export interface ActivityTypeOption {
  value: string
  label: string
  icon: LucideIcon
}

/** A chapter an activity can be filed under. */
export interface ChapterOption {
  value: string
  label: string
}

export interface LinkedPayment {
  id: string
  title: string
  amount: number
  date: string
  status: PaymentStatus
}

/** Activity as shown on the feed and detail screens. */
export interface ActivityDetail extends Activity {
  linkedPayment?: LinkedPayment
  /** Set only when someone else recorded it for the member. */
  recordedByName?: string
  /** e.g. "Secretary"; only with recordedByName. */
  recordedByTitle?: string
  /** 1 = never edited. */
  version: number
  /** From the single-activity read only; false on list rows. */
  canEdit: boolean
  canReview: boolean
}

/** A version that an edit replaced. */
export interface ActivityVersion {
  version: number
  title: string
  typeName?: string
  /** Local-midday ISO, like Activity.date. */
  date: string
  peopleReached: number
  place: string
  note?: string
  photoCount: number
  status: ActivityStatus
  rejectionReason?: string
  editedBy?: string
  replacedAt: string
}

/** Where the phone was when the activity was recorded. */
export interface GeoFix {
  lat: number
  lng: number
  accuracyM: number
}

/** A member the activity can be recorded for. */
export interface MemberOption {
  id: string
  name: string
  phone?: string
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
  /** Chapter id; empty = the recorder's own chapter (the backend default). */
  chapterId?: string
}

export interface NewActivityInput extends ActivityDetailsInput {
  /** Activity type slug. */
  type: string
  /** New photos, already shrunk on the phone. */
  photos: ShrunkPhoto[]
  /** Already-uploaded photos to keep (edits). */
  keptPhotoUrls: string[]
  videoUrl?: string
  /** Record it for this member instead of yourself. */
  forProfileId?: string
  location?: GeoFix
}

export interface RejectInput {
  reason: RejectReasonId
  note?: string
}

/** A photo shrunk for upload, with its list thumbnail. */
export interface ShrunkPhoto {
  photo: ShrunkImage
  thumb: ShrunkImage
}

/** A new photo with its storage name (the file name without extension). */
export interface NamedPhoto extends ShrunkPhoto {
  id: string
}

/** A photo in the wizard: a new shrunk one with a local preview, or an uploaded one (no shrunk, preview = its URL). */
export interface PickedPhoto {
  shrunk?: ShrunkPhoto
  preview: string
}

/** Activity fields a draft keeps; its photos are stored beside them. */
export type DraftActivityInput = Omit<NewActivityInput, 'photos' | 'keptPhotoUrls'>

/** A new activity saved on the phone because there was no signal. */
export interface ActivityDraft {
  clientRef: string
  ownerId: string
  groupId: string
  /** ISO time it was saved. */
  createdAt: string
  input: DraftActivityInput
  photos: NamedPhoto[]
  lastError?: string
  /** The backend refused it; it is only retried by hand. */
  needsAttention?: boolean
}

/** What recording a new activity led to. */
export type RecordResult = { kind: 'sent'; activity: ActivityDetail } | { kind: 'saved' }

/** One page of the activities list. */
export interface ActivityPage {
  total: number
  rows: ActivityDetail[]
}
