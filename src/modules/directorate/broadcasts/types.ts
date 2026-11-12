export type Audience = 'leaders' | 'members'

/** 'free' = in-app + email; 'sms' = in-app + SMS (each SMS costs money). */
export type Channel = 'free' | 'sms'

/** A verified group chosen as the only audience. */
export interface PickedGroup {
  id: string
  name: string
  place: string
}

export interface BroadcastDraft {
  audience: Audience
  state: string
  /** Category id, or "" for all. */
  category: string
  /** One verified group picked by staff, or null for every group in the filters. */
  group: PickedGroup | null
  channel: Channel
  text: string
}

export interface SentBroadcast {
  id: string
  text: string
  audience?: Audience
  /** The state it went to, when one was chosen (older broadcasts don't record it). */
  state?: string
  recipients: number
  channel: Channel
  status: string
  sentAt: string
}

export interface BroadcastResult {
  campaignId: string
  recipients: number
  queued: number
  inAppOnly: number
}

/** Who a broadcast would reach right now (count_support_group_broadcast_recipients). */
export interface RecipientCount {
  total: number
  withEmail: number
  withPhone: number
}

/** The filters that decide who receives a broadcast. */
export type AudienceFilter = Pick<BroadcastDraft, 'audience' | 'state' | 'category'> & { groupId?: string }
