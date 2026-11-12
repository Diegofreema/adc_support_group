export type Audience = 'leaders' | 'members'

/** 'free' = in-app + email; 'sms' = in-app + SMS (free for the Directorate). */
export type Channel = 'free' | 'sms'

export interface BroadcastDraft {
  audience: Audience
  state: string
  /** Category id, or "" for all. */
  category: string
  /** Group name typed by staff; matched to one verified group when sending. */
  group: string
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
