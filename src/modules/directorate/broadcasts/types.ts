export type Audience = 'leaders' | 'members'

export interface Channels {
  app: boolean
  sms: boolean
}

export interface BroadcastDraft {
  audience: Audience
  state: string
  category: string
  group: string
  channels: Channels
  text: string
}

export interface SentBroadcast {
  id: string
  text: string
  audience: Audience
  place: string
  recipients: number
  channels: Channels
  sentAt: string
}

export interface PointPack {
  id: string
  naira: number
  points: number
}
