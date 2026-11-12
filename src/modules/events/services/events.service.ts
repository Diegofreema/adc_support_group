import { activityTypeIcon } from '@/config/activity-types'
import { rpc, supabase, unwrap } from '@/lib/supabase'
import type { ChapterOption, EventInput, EventPage, EventStatus, EventTypeOption, EventWhen, GroupEvent, VenuePoint } from '../types'

/** private.sg_event_json */
interface EventJson {
  id: string
  group_id: string
  chapter_id: string | null
  chapter_name: string | null
  type: string
  type_name: string
  title: string
  note: string | null
  starts_at: string
  ends_at: string | null
  venue: string
  state: string
  lga: string
  ward: string
  has_venue_location: boolean
  status: EventStatus
  cancel_reason: string | null
  guests: number | null
  activity_id: string | null
  created_by_name: string | null
  rsvp_count: number
  present_count: number
  my_rsvp: boolean
  checked_in: boolean
  checkin_open: boolean
  can_manage: boolean
  checkin_code: string | null
}

function toEvent(json: EventJson): GroupEvent {
  return {
    id: json.id,
    groupId: json.group_id,
    chapterId: json.chapter_id ?? undefined,
    chapterName: json.chapter_name ?? undefined,
    type: json.type,
    typeName: json.type_name,
    title: json.title,
    note: json.note ?? undefined,
    startsAt: json.starts_at,
    endsAt: json.ends_at ?? undefined,
    venue: json.venue,
    state: json.state,
    lga: json.lga,
    ward: json.ward,
    hasVenueLocation: json.has_venue_location,
    status: json.status,
    cancelReason: json.cancel_reason ?? undefined,
    guests: Number(json.guests ?? 0),
    activityId: json.activity_id ?? undefined,
    createdByName: json.created_by_name ?? undefined,
    rsvpCount: Number(json.rsvp_count),
    presentCount: Number(json.present_count),
    myRsvp: json.my_rsvp,
    checkedIn: json.checked_in,
    checkinOpen: json.checkin_open,
    canManage: json.can_manage,
    checkinCode: json.checkin_code ?? undefined,
  }
}

/** Rows per "Load more". */
export const EVENT_PAGE_SIZE = 20

/** Upcoming: soonest first. Past (ended, cancelled or done): latest first. */
export async function listEventPage(when: EventWhen, offset: number, limit = EVENT_PAGE_SIZE): Promise<EventPage> {
  const page = await rpc<{ total: number; rows: EventJson[] }>('get_support_group_events', { p_when: when, p_limit: limit, p_offset: offset })
  return { total: Number(page.total), rows: page.rows.map(toEvent) }
}

export async function getEvent(id: string): Promise<GroupEvent> {
  return toEvent(await rpc<EventJson>('get_support_group_event', { p_event_id: id }))
}

/** The fields create and update share. */
function eventArgs(input: EventInput) {
  return {
    p_type: input.type,
    p_title: input.title,
    p_starts_at: input.startsAt,
    p_ends_at: input.endsAt ?? null,
    p_venue: input.venue,
    p_state: input.state,
    p_lga: input.lga,
    p_ward: input.ward,
    p_note: input.note || null,
    p_lat: input.location?.lat ?? null,
    p_lng: input.location?.lng ?? null,
  }
}

/** Needs the events power. A coordinator's event is always their chapter's. */
export async function createEvent(input: EventInput): Promise<GroupEvent> {
  return toEvent(await rpc<EventJson>('create_support_group_event', { ...eventArgs(input), p_chapter_id: input.chapterId || null }))
}

/** While scheduled. No location sent keeps the saved one; the chapter can't change. */
export async function updateEvent(id: string, input: EventInput): Promise<GroupEvent> {
  return toEvent(await rpc<EventJson>('update_support_group_event', { p_event_id: id, ...eventArgs(input) }))
}

export async function cancelEvent(id: string, reason: string): Promise<GroupEvent> {
  return toEvent(await rpc<EventJson>('cancel_support_group_event', { p_event_id: id, p_reason: reason }))
}

export async function setRsvp(id: string, coming: boolean): Promise<GroupEvent> {
  return toEvent(await rpc<EventJson>('set_support_group_event_rsvp', { p_event_id: id, p_coming: coming }))
}

/** Self check-in with the venue QR's code. Location is optional. */
export async function checkIn(code: string, point?: VenuePoint): Promise<GroupEvent> {
  return toEvent(await rpc<EventJson>('check_in_to_support_group_event', { p_code: code, p_lat: point?.lat ?? null, p_lng: point?.lng ?? null }))
}

/** Enabled activity types, in the Directorate's order (events use the same list). */
export async function listEventTypes(): Promise<EventTypeOption[]> {
  const rows = unwrap(await supabase
    .from('support_group_activity_types')
    .select('slug, name')
    .eq('is_enabled', true)
    .order('sort'))
  return (rows ?? []).map((row) => ({ value: row.slug as string, label: row.name as string, icon: activityTypeIcon(row.slug as string) }))
}

/** The group's chapters. An unverified group has none (the RPC refuses it). */
export async function listChapterOptions(): Promise<ChapterOption[]> {
  const chapters = await rpc<{ id: string; name: string }[]>('get_support_group_chapters').catch((error: Error) => {
    if (/not been verified/.test(error.message)) return []
    throw error
  })
  return chapters.map((chapter) => ({ value: chapter.id, label: `${chapter.name} chapter` }))
}
