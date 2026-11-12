import { rejectReasonText } from '../utils/reject-reasons'
import { placeholderTones } from '../utils/activity-photos'
import { activityTypeIcon } from '@/config/activity-types'
import { rpc, supabase, unwrap } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { ActivityStatus, PaymentStatus } from '@/types/domain'
import type { ActivityDetail, ActivityTypeOption, ChapterOption, LinkedPayment, NewActivityInput, RejectInput } from '../types'

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
}

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
    // A calendar day: read it at local midday so no time zone shifts it.
    date: `${json.occurred_on}T12:00:00`,
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
  }
}

const PAGE = 100

/** Everything the caller may see in their group (leader: all; member: approved + own), newest first. */
export async function listActivities(_groupId: string): Promise<ActivityDetail[]> {
  const activities: ActivityDetail[] = []
  for (let offset = 0; ; offset += PAGE) {
    const page = await rpc<{ total: number; rows: ActivityJson[] }>('get_support_group_activities', { p_limit: PAGE, p_offset: offset })
    activities.push(...page.rows.map(toActivity))
    if (activities.length >= page.total || page.rows.length === 0) return activities
  }
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

const PHOTO_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }

function activeGroupId(): string {
  const groupId = sessionStore.getUser()?.activeGroupId
  if (!groupId) throw new Error('You are not in a group')
  return groupId
}

/** Upload one photo to the group's folder in activity-media; returns its public URL. */
async function uploadPhoto(groupId: string, file: File): Promise<string> {
  const ext = PHOTO_TYPES[file.type]
  if (!ext) throw new Error('Photos must be JPG, PNG or WebP')
  const path = `support-groups/${groupId}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('activity-media').upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw new Error(`Could not upload a photo: ${error.message}`)
  return supabase.storage.from('activity-media').getPublicUrl(path).data.publicUrl
}

/** Leader's own entries come back approved; everyone else's wait for the leader. */
export async function createActivity(input: NewActivityInput): Promise<ActivityDetail> {
  const groupId = activeGroupId()
  const mediaUrls = await Promise.all(input.photos.map((file) => uploadPhoto(groupId, file)))
  return toActivity(await rpc<ActivityJson>('record_support_group_activity', {
    p_type: input.type,
    p_title: input.title,
    p_occurred_on: input.date,
    p_people_reached: input.peopleReached,
    p_state: input.state,
    p_lga: input.lga,
    p_ward: input.ward,
    p_note: input.note || null,
    p_video_url: input.videoUrl || null,
    p_media_urls: mediaUrls,
    p_chapter_id: input.chapterId ?? null,
  }))
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
