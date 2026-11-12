import { queryOptions } from '@tanstack/react-query'

import { groupListArgs, type GroupJson } from '../../shared/services/group-json'
import { directorateKeys } from '../../shared/query-keys'
import type { Audience, BroadcastDraft, BroadcastResult, Channel, SentBroadcast } from '../types'
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

/** The one verified group a typed name points to. */
async function resolveGroupId(name: string): Promise<string> {
  const { rows } = await rpc<{ rows: GroupJson[] }>('get_admin_sg_groups', groupListArgs({ status: 'verified', search: name }, 5, 0))
  if (rows.length === 0) throw new Error('No verified group matches that name')
  const exact = rows.filter((row) => row.name.toLowerCase() === name.toLowerCase())
  const target = rows.length === 1 ? rows[0] : exact.length === 1 ? exact[0] : undefined
  if (!target) throw new Error('Several groups match. Type the full group name')
  return target.id
}

/** Send through adc-send-message. Recipients are worked out on the server; staff send SMS free. */
export async function sendBroadcast(draft: BroadcastDraft): Promise<BroadcastResult> {
  const group = draft.group.trim()
  const channel: Channel = draft.channel
  return invokeFunction<BroadcastResult>('adc-send-message', {
    mode: 'broadcast',
    channel,
    audience: draft.audience,
    message: draft.text.trim(),
    state: draft.state || undefined,
    categoryId: draft.category || undefined,
    groupId: group ? await resolveGroupId(group) : undefined,
  })
}
