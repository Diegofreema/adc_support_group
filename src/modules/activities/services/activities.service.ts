import { rejectReasonText } from '../utils/reject-reasons'
import { placeholderTones } from '../utils/activity-photos'
import { activityTypeIcon } from '@/config/activity-types'
import { PHOTO_CACHE_SECONDS, thumbPath, type ShrunkImage } from '@/lib/image'
import { rpc, supabase, unwrap } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { ActivityStatus, PaymentStatus } from '@/types/domain'
import type { ActivityDetail, ActivityPage, ActivityTab, ActivityTypeOption, ActivityVersion, ChapterOption, DraftActivityInput, GeoFix, LinkedPayment, MemberOption, NamedPhoto, NewActivityInput, RejectInput } from '../types'

/** private.support_group_activity_json */
interface ActivityJson {
  id: string
  group_id: string
  group_name: string
  chapter_id: string | null
  chapter_name: string | null
  type: string
  type_name: string
  title: string
  occurred_on: string
  people_reached: number
  state: string | null
  lga: string | null
  ward: string | null
  note: string | null
  video_url: string | null
  media_urls: string[] | null
  status: ActivityStatus
  logged_by: string | null
  logged_by_name: string | null
  approved_by_name: string | null
  rejection_reason: string | null
  checked_by_directorate: boolean
  payment_id: string | null
  recorded_by_name: string | null
  recorded_by_title: string | null
  version: number
  /** get_support_group_activity only. */
  can_edit?: boolean
  can_review?: boolean
}

/** A calendar day: read it at local midday so no time zone shifts it. */
const calendarDay = (day: string) => `${day.slice(0, 10)}T12:00:00`

function toActivity(json: ActivityJson): ActivityDetail {
  const photoUrls = json.media_urls ?? []
  return {
    id: json.id,
    groupId: json.group_id,
    groupName: json.group_name,
    chapterId: json.chapter_id ?? undefined,
    chapterName: json.chapter_name ?? undefined,
    type: json.type,
    typeName: json.type_name,
    title: json.title,
    date: calendarDay(json.occurred_on),
    peopleReached: Number(json.people_reached),
    state: json.state ?? undefined,
    lga: json.lga ?? undefined,
    ward: json.ward ?? undefined,
    note: json.note ?? undefined,
    videoUrl: json.video_url ?? undefined,
    photoUrls,
    photoTones: placeholderTones(json.id, photoUrls.length),
    status: json.status,
    loggedBy: json.logged_by_name ?? 'Unknown',
    loggedById: json.logged_by ?? undefined,
    approvedBy: json.approved_by_name ?? undefined,
    checkedByDirectorate: json.checked_by_directorate,
    rejectionReason: json.rejection_reason ?? undefined,
    paymentId: json.payment_id ?? undefined,
    recordedByName: json.recorded_by_name ?? undefined,
    recordedByTitle: json.recorded_by_name ? json.recorded_by_title ?? undefined : undefined,
    version: Number(json.version ?? 1),
    canEdit: json.can_edit ?? false,
    canReview: json.can_review ?? false,
  }
}

/** Rows per "Load more". */
export const ACTIVITY_PAGE_SIZE = 20

const TAB_FILTERS: Record<ActivityTab, Record<string, unknown>> = {
  all: {},
  review: { p_status: 'pending' },
  mine: { p_mine: true },
}

/** One page of a tab, newest first (leader: all; member: approved + own; mine: logged or recorded by me). */
export async function listActivityPage(tab: ActivityTab, offset: number, limit = ACTIVITY_PAGE_SIZE): Promise<ActivityPage> {
  const page = await rpc<{ total: number; rows: ActivityJson[] }>('get_support_group_activities', { ...TAB_FILTERS[tab], p_limit: limit, p_offset: offset })
  return { total: Number(page.total), rows: page.rows.map(toActivity) }
}

interface PaymentJson {
  id: string
  cause_title: string | null
  purpose: string | null
  amount: number | string
  status: PaymentStatus
  paid_on: string | null
  created_at: string
}

function paymentTitle(json: PaymentJson): string {
  if (json.cause_title) return json.cause_title
  return json.purpose ? json.purpose[0]!.toUpperCase() + json.purpose.slice(1) : 'Payment'
}

/** Members only see their own payments, so the linked one may be hidden from them. */
async function linkedPayment(paymentId: string): Promise<LinkedPayment | undefined> {
  try {
    const json = await rpc<PaymentJson>('get_support_group_payment', { p_payment_id: paymentId })
    return { id: json.id, title: paymentTitle(json), amount: Number(json.amount), date: json.paid_on ?? json.created_at, status: json.status }
  } catch {
    return undefined
  }
}

export async function getActivity(id: string): Promise<ActivityDetail> {
  const activity = toActivity(await rpc<ActivityJson>('get_support_group_activity', { p_activity_id: id }))
  if (!activity.paymentId) return activity
  return { ...activity, linkedPayment: await linkedPayment(activity.paymentId) }
}

/** Enabled activity types, in the Directorate's order. */
export async function listActivityTypes(): Promise<ActivityTypeOption[]> {
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

const BUCKET = 'activity-media'

export function activeGroupId(): string {
  const groupId = sessionStore.getUser()?.activeGroupId
  if (!groupId) throw new Error('You are not in a group')
  return groupId
}

/** Members can't overwrite, so an earlier upload of the same path (a re-sent draft) comes back as a duplicate. */
function isDuplicate(error: { message: string; status?: number; statusCode?: string }): boolean {
  return error.statusCode === '409' || error.status === 409 || /already exists|duplicate/i.test(error.message)
}

async function uploadImage(path: string, image: ShrunkImage): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, image.blob, {
    contentType: image.contentType,
    cacheControl: PHOTO_CACHE_SECONDS,
    upsert: false,
  })
  if (error && !isDuplicate(error)) throw new Error(`Could not upload a photo: ${error.message}`)
}

/** Upload a photo and its thumbnail beside it; returns the photo's public URL. */
async function uploadPhoto(groupId: string, photo: NamedPhoto): Promise<string> {
  const path = `support-groups/${groupId}/${photo.id}.${photo.photo.ext}`
  await uploadImage(path, photo.photo)
  await uploadImage(thumbPath(path), photo.thumb)
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

/** Upload new photos one after another (patchy data: one at a time finishes sooner than six at once). */
async function uploadPhotos(groupId: string, photos: NamedPhoto[]): Promise<string[]> {
  const urls: string[] = []
  for (const photo of photos) urls.push(await uploadPhoto(groupId, photo))
  return urls
}

function locationArgs(location?: GeoFix) {
  return { p_lat: location?.lat ?? null, p_lng: location?.lng ?? null, p_accuracy_m: location ? Math.round(location.accuracyM) : null }
}

/** The fields record and edit share. */
function activityArgs(input: DraftActivityInput, media: string[]) {
  return {
    p_type: input.type,
    p_title: input.title,
    p_occurred_on: input.date,
    p_people_reached: input.peopleReached,
    p_state: input.state,
    p_lga: input.lga,
    p_ward: input.ward,
    p_note: input.note || null,
    p_video_url: input.videoUrl || null,
    p_media_urls: media,
    ...locationArgs(input.location),
  }
}

/**
 * Upload a new activity's photos and record it. Entries by someone with the
 * approvals power come back approved; everyone else's wait. The same
 * clientRef sent twice returns the first copy, so a re-sent draft never doubles.
 */
export async function recordActivity(groupId: string, clientRef: string, input: DraftActivityInput, photos: NamedPhoto[]): Promise<ActivityDetail> {
  const media = await uploadPhotos(groupId, photos)
  return toActivity(await rpc<ActivityJson>('record_support_group_activity', {
    ...activityArgs(input, media),
    p_chapter_id: input.chapterId ?? null,
    p_for_profile_id: input.forProfileId ?? null,
    p_client_ref: clientRef,
  }))
}

/** Edit a waiting or sent-back activity; the old version is kept and it goes back for approval. */
export async function editActivity(id: string, input: NewActivityInput): Promise<ActivityDetail> {
  const named = input.photos.map((photo) => ({ ...photo, id: crypto.randomUUID() }))
  const media = [...input.keptPhotoUrls, ...await uploadPhotos(activeGroupId(), named)]
  return toActivity(await rpc<ActivityJson>('edit_support_group_activity', { p_activity_id: id, ...activityArgs(input, media) }))
}

/** get_support_group_activity_versions row */
interface VersionJson {
  version: number
  title: string
  type_name: string | null
  occurred_on: string
  people_reached: number
  state: string | null
  lga: string | null
  ward: string | null
  note: string | null
  media_urls: string[] | null
  status: ActivityStatus
  rejection_reason: string | null
  edited_by_name: string | null
  replaced_at: string
}

function toVersion(json: VersionJson): ActivityVersion {
  return {
    version: Number(json.version),
    title: json.title,
    typeName: json.type_name ?? undefined,
    date: calendarDay(json.occurred_on),
    peopleReached: Number(json.people_reached),
    place: [json.ward, json.lga, json.state].filter(Boolean).join(', '),
    note: json.note ?? undefined,
    photoCount: json.media_urls?.length ?? 0,
    status: json.status,
    rejectionReason: json.rejection_reason ?? undefined,
    editedBy: json.edited_by_name ?? undefined,
    replacedAt: json.replaced_at,
  }
}

/** Versions replaced by edits, newest first. */
export async function listActivityVersions(id: string): Promise<ActivityVersion[]> {
  const rows = await rpc<VersionJson[]>('get_support_group_activity_versions', { p_activity_id: id })
  return (rows ?? []).map(toVersion)
}

const MEMBER_SEARCH_LIMIT = 8

/** Members the caller can record for (the backend scopes coordinators to their chapter). */
export async function searchMembers(search: string): Promise<MemberOption[]> {
  const page = await rpc<{ rows: { profile_id: string; full_name: string | null; phone: string | null }[] }>('get_support_group_roster', {
    p_search: search.trim() || null,
    p_limit: MEMBER_SEARCH_LIMIT,
    p_offset: 0,
  })
  return page.rows.map((row) => ({ id: row.profile_id, name: row.full_name ?? 'Member', phone: row.phone ?? undefined }))
}

export async function approveActivity(id: string): Promise<ActivityDetail> {
  return toActivity(await rpc<ActivityJson>('review_support_group_activity', { p_activity_id: id, p_approve: true }))
}

export async function rejectActivity(id: string, input: RejectInput): Promise<ActivityDetail> {
  return toActivity(await rpc<ActivityJson>('review_support_group_activity', {
    p_activity_id: id,
    p_approve: false,
    p_reason: rejectReasonText(input.reason, input.note),
  }))
}
