import { AUDIENCE_LABEL } from '../utils/channels'
import { SMS_PACKS } from '../utils/sms-packs'
import type { Audience, AudienceOption, ChapterAudience, NewMessageInput, PointsPurchase, SentMessage } from '../types'
import { invokeFunction } from '@/lib/edge-functions'
import { rpc, supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'

/** How many members a roster filter reaches (the roster's total, one row fetched). */
async function rosterTotal(filter: 'all' | 'executives'): Promise<number> {
  const page = await rpc<{ total: number }>('get_support_group_roster', { p_filter: filter, p_limit: 1, p_offset: 0 })
  return Number(page.total)
}

interface ChapterRow {
  id: string
  name: string
  member_count: number
}

/** A group still waiting for the Directorate has no chapters yet. */
export async function listChapterAudiences(): Promise<ChapterAudience[]> {
  const chapters = await rpc<ChapterRow[]>('get_support_group_chapters').catch((error: Error) => {
    if (/not been verified/.test(error.message)) return []
    throw error
  })
  return chapters.map((chapter) => ({ id: chapter.id, name: chapter.name, count: Number(chapter.member_count) }))
}

/** All members and executives; "One chapter" only when the group has chapters. */
export async function listAudiences(): Promise<AudienceOption[]> {
  const [all, executives, chapters] = await Promise.all([rosterTotal('all'), rosterTotal('executives'), listChapterAudiences()])
  const options: AudienceOption[] = [{ value: 'all', label: AUDIENCE_LABEL.all, count: all }]
  if (chapters.length > 0) options.push({ value: 'chapter', label: AUDIENCE_LABEL.chapter, count: chapters[0]!.count })
  options.push({ value: 'executives', label: AUDIENCE_LABEL.executives, count: executives })
  return options
}

interface CampaignRow {
  id: string
  subject: string | null
  body: string
  channel: string
  recipient_count: number | null
  created_at: string
  provider_meta: { audience?: string | null } | null
}

function audienceOf(row: CampaignRow): Audience {
  const audience = row.provider_meta?.audience
  return audience === 'chapter' || audience === 'executives' ? audience : 'all'
}

function toSentMessage(row: CampaignRow): SentMessage {
  return {
    id: row.id,
    subject: row.subject || subjectOf(row.body),
    audienceLabel: AUDIENCE_LABEL[audienceOf(row)],
    // 'email' is the free App + Email channel.
    channel: row.channel === 'sms' ? 'sms' : 'free',
    recipients: Number(row.recipient_count ?? 0),
    sentAt: row.created_at,
  }
}

/** The leader's own ADC campaigns (RLS lets creators read their rows). */
export async function listSentMessages(): Promise<SentMessage[]> {
  const user = sessionStore.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('broadcast_campaigns')
    .select('id, subject, body, channel, recipient_count, created_at, provider_meta')
    .eq('created_by', user.id)
    .eq('provider_meta->>app', 'adc')
    .neq('status', 'failed')
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) throw new Error(error.message)
  return (data as CampaignRow[]).map(toSentMessage)
}

export async function getPointsBalance(): Promise<number> {
  const points = await rpc<{ balance: number }>('get_my_sms_points', { p_limit: 1, p_offset: 0 })
  return Number(points.balance ?? 0)
}

function subjectOf(body: string): string {
  const firstLine = body.trim().split('\n')[0] ?? ''
  return firstLine.length > 40 ? `${firstLine.slice(0, 40)}…` : firstLine
}

interface SendResult {
  campaignId: string
  recipients: number
}

/** SMS is paid from the leader's points (402 "insufficient_points" when short); App + Email is free. */
export async function sendMessage(input: NewMessageInput): Promise<SendResult> {
  return invokeFunction<SendResult>('adc-send-message', {
    mode: 'group',
    channel: input.channel,
    message: input.body.trim(),
    subject: subjectOf(input.body),
    audience: input.audience,
    chapterId: input.audience === 'chapter' ? input.chapterId : undefined,
  })
}

/** Starts a Funz purchase; returns the payment page to send the browser to. */
export async function buyPoints(packId: string): Promise<string> {
  const pack = SMS_PACKS.find((candidate) => candidate.id === packId)
  if (!pack) throw new Error('Choose a pack')
  const { payment_url } = await invokeFunction<{ reference: string; payment_url: string }>('buy-sms-points', { amount: pack.price })
  return payment_url
}

/** After Funz sends the buyer back to /messages?purchase=<ref>: settle and credit. */
export function verifyPurchase(reference: string): Promise<PointsPurchase> {
  return invokeFunction<PointsPurchase>('verify-sms-points', { reference })
}

const CHECKS = 6
const CHECK_EVERY_MS = 5_000

/** A bank transfer can take a moment to clear: re-check a few times while it is pending. */
export async function waitForPurchase(reference: string): Promise<PointsPurchase> {
  let result = await verifyPurchase(reference)
  for (let check = 1; check < CHECKS && result.status === 'pending' && !result.expired; check++) {
    await new Promise((resolve) => setTimeout(resolve, CHECK_EVERY_MS))
    result = await verifyPurchase(reference)
  }
  return result
}
