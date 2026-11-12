import type { LucideIcon } from 'lucide-react'

import type { ShrunkImage } from '@/lib/image'

export type EventStatus = 'scheduled' | 'cancelled' | 'done'
export type EventWhen = 'upcoming' | 'past'
export type AttendanceFilter = 'all' | 'coming' | 'present'

/** A group event, as the caller sees it. */
export interface GroupEvent {
  id: string
  groupId: string
  chapterId?: string
  chapterName?: string
  /** Activity type slug. */
  type: string
  typeName: string
  title: string
  note?: string
  /** ISO time. */
  startsAt: string
  endsAt?: string
  venue: string
  state: string
  lga: string
  ward: string
  hasVenueLocation: boolean
  status: EventStatus
  cancelReason?: string
  guests: number
  activityId?: string
  createdByName?: string
  rsvpCount: number
  presentCount: number
  myRsvp: boolean
  checkedIn: boolean
  checkinOpen: boolean
  /** The backend says this caller may run the event. */
  canManage: boolean
  /** Managers only. */
  checkinCode?: string
}

export interface EventPage {
  total: number
  rows: GroupEvent[]
}

/** An enabled activity type (slug from the backend, icon from config). */
export interface EventTypeOption {
  value: string
  label: string
  icon: LucideIcon
}

export interface ChapterOption {
  value: string
  label: string
}

/** The venue's position, taken on the organiser's phone. */
export interface VenuePoint {
  lat: number
  lng: number
}

export interface EventInput {
  type: string
  title: string
  /** ISO time. */
  startsAt: string
  endsAt?: string
  venue: string
  state: string
  lga: string
  ward: string
  note?: string
  /** Empty = whole group (coordinators: their chapter, set by the backend). */
  chapterId?: string
  location?: VenuePoint
}

/** One person on the attendance list. */
export interface Attendee {
  profileId: string
  name: string
  phone?: string
  coming: boolean
  present: boolean
  via?: 'ticked' | 'qr'
  farFromVenue: boolean
  distanceM?: number
}

export interface AttendancePage {
  total: number
  rows: Attendee[]
  presentCount: number
  comingCount: number
  guests: number
}

/** A photo shrunk for upload, with its list thumbnail. */
export interface ShrunkPhoto {
  photo: ShrunkImage
  thumb: ShrunkImage
}

/** A picked photo with its local preview URL. */
export interface PickedPhoto {
  shrunk: ShrunkPhoto
  preview: string
}

export interface RecordEventInput {
  guests: number
  peopleReached: number
  note?: string
  photos: ShrunkPhoto[]
  /** Same ref on a retry, so the activity is never made twice. */
  clientRef: string
}
