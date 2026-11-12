import { queryOptions } from '@tanstack/react-query'

import { groupListArgs, type GroupJson } from '../../shared/services/group-json'
import { directorateKeys } from '../../shared/query-keys'
import type { Audience, AudienceFilter, BroadcastDraft, BroadcastResult, Channel, PickedGroup, RecipientCount, SentBroadcast } from '../types'
import { invokeFunction } from '@/lib/edge-functions'
import { rpc, supabase } from '@/lib/supabase'

interface CampaignRow {
  id: string
  body: string | null
  channel: string
  recipient_count: number | null
  status: string
  created_at: string
  /** `state` is only stored on newer broadcasts. */
  provider_meta: { audience?: Audience; state?: string | null } | null
}

function toSent(row: CampaignRow): SentBroadcast {
  return {
    id: row.id,
    text: row.body ?? '',
    audience: row.provider_meta?.audience,
    state: row.provider_meta?.state ?? undefined,
    recipients: Number(row.recipient_count ?? 0),
    channel: row.channel === 'sms' ? 'sms' : 'free',
    status: row.status,
    sentAt: row.created_at,
  }
}

/** ADC Directorate broadcasts (staff read broadcast_campaigns directly). */
async function fetchSentBroadcasts(): Promise<SentBroadcast[]> {
  const { data, error } = await supabase
    .from('broadcast_campaigns')
    .select('id, body, channel, recipient_count, status, created_at, provider_meta')
    .eq('provider_meta->>app', 'adc')
    .eq('provider_meta->>mode', 'broadcast')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) throw new Error(error.message)
  return ((data ?? []) as CampaignRow[]).map(toSent)
}

export const sentBroadcastsQuery = queryOptions({ queryKey: directorateKeys.broadcasts(), queryFn: fetchSentBroadcasts })

/** How many verified groups the picker shows for a search. */
const GROUP_MATCH_LIMIT = 6

/** Verified groups whose name or leader matches what staff typed. */
async function searchVerifiedGroups(search: string): Promise<PickedGroup[]> {
  const { rows } = await rpc<{ rows: GroupJson[] }>('get_admin_sg_groups', groupListArgs({ status: 'verified', search }, GROUP_MATCH_LIMIT, 0))
  return rows.map((row) => ({ id: row.id, name: row.name, place: [row.state, row.lga].filter(Boolean).join(' · ') || row.country || 'National' }))
}

export const groupSearchQuery = (search: string) =>
  queryOptions({ queryKey: [...directorateKeys.broadcasts(), 'group-search', search], queryFn: () => searchVerifiedGroups(search), staleTime: 60_000 })

interface RecipientCountJson {
  total: number | string
  with_email: number | string
  with_phone: number | string
}

/** Counts only, never contact details; state admins are pinned to their state by the server. */
async function countRecipients(filter: AudienceFilter): Promise<RecipientCount> {
  const json = await rpc<RecipientCountJson>('count_support_group_broadcast_recipients', {
    p_audience: filter.audience,
    p_state: filter.state || null,
    p_category_id: filter.category || null,
    p_group_id: filter.groupId ?? null,
  })
  return { total: Number(json.total), withEmail: Number(json.with_email), withPhone: Number(json.with_phone) }
}

export const recipientCountQuery = (filter: AudienceFilter) =>
  queryOptions({ queryKey: [...directorateKeys.broadcasts(), 'reach', filter], queryFn: () => countRecipients(filter), staleTime: 30_000 })

/** Send through adc-send-message. Recipients are worked out on the server; SMS is charged per message. */
export async function sendBroadcast(draft: BroadcastDraft): Promise<BroadcastResult> {
  const channel: Channel = draft.channel
  return invokeFunction<BroadcastResult>('adc-send-message', {
    mode: 'broadcast',
    channel,
    audience: draft.audience,
    message: draft.text.trim(),
    state: draft.state || undefined,
    categoryId: draft.category || undefined,
    groupId: draft.group?.id,
  })
}
