import { rpc } from '@/lib/supabase'
import type { AttendanceFilter, AttendancePage, Attendee } from '../types'

interface AttendeeJson {
  profile_id: string
  full_name: string | null
  phone: string | null
  coming: boolean
  present: boolean
  via: 'ticked' | 'qr' | null
  far_from_venue: boolean
  distance_m: number | null
}

interface AttendanceJson {
  total: number
  rows: AttendeeJson[]
  present_count: number
  coming_count: number
  guests: number | null
}

function toAttendee(json: AttendeeJson): Attendee {
  return {
    profileId: json.profile_id,
    name: json.full_name ?? 'Member',
    phone: json.phone ?? undefined,
    coming: json.coming,
    present: json.present,
    via: json.via ?? undefined,
    farFromVenue: json.far_from_venue,
    distanceM: json.distance_m ?? undefined,
  }
}

/** Rows per "Load more". */
export const ATTENDANCE_PAGE_SIZE = 50

/** Organiser only: the chapter's (or group's) people with RSVP and attendance marks, present first. */
export async function listAttendancePage(eventId: string, filter: AttendanceFilter, search: string, offset: number): Promise<AttendancePage> {
  const page = await rpc<AttendanceJson>('get_support_group_event_attendance', {
    p_event_id: eventId,
    p_filter: filter,
    p_search: search.trim() || null,
    p_limit: ATTENDANCE_PAGE_SIZE,
    p_offset: offset,
  })
  return {
    total: Number(page.total),
    rows: page.rows.map(toAttendee),
    presentCount: Number(page.present_count),
    comingCount: Number(page.coming_count),
    guests: Number(page.guests ?? 0),
  }
}

/** Tick or un-tick one person (from an hour before the start). */
export async function setAttendance(eventId: string, profileId: string, present: boolean): Promise<void> {
  await rpc<null>('set_support_group_event_attendance', { p_event_id: eventId, p_profile_id: profileId, p_present: present })
}
