export type Audience = 'all' | 'chapter' | 'executives'
export type Channel = 'free' | 'sms'
export type MessagesTab = 'new' | 'sent'

export interface AudienceOption {
  value: Audience
  label: string
  count: number
}

export interface SentMessage {
  id: string
  subject: string
  audienceLabel: string
  channel: Channel
  recipients: number
  sentAt: string
}

export interface SmsPack {
  id: string
  points: number
  price: number
}

export interface NewMessageInput {
  audience: Audience
  channel: Channel
  body: string
  recipients: number
}

export interface SmsCost {
  pages: number
  points: number
  enough: boolean
  shortBy: number
}
