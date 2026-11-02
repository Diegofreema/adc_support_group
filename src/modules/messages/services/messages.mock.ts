import type { AudienceOption, SentMessage } from '../types'

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString()

export const AUDIENCES: AudienceOption[] = [
  { value: 'all', label: 'All members', count: 3482 },
  { value: 'chapter', label: 'One chapter', count: 912 },
  { value: 'executives', label: 'Executives', count: 22 },
]

export const SENT_MESSAGES: SentMessage[] = [
  { id: 'msg_1', subject: 'Meeting Saturday, 10am', audienceLabel: 'All members', channel: 'free', recipients: 3482, sentAt: daysAgo(0) },
  { id: 'msg_2', subject: 'Rally reminder', audienceLabel: 'Lagos chapter', channel: 'sms', recipients: 912, sentAt: daysAgo(2) },
  { id: 'msg_3', subject: 'Welcome to new members', audienceLabel: 'All members', channel: 'free', recipients: 3358, sentAt: daysAgo(8) },
  { id: 'msg_4', subject: 'Executives meeting', audienceLabel: 'Executives', channel: 'sms', recipients: 22, sentAt: daysAgo(12) },
]

/** Group's SMS points balance (mutable mock). */
export const POINTS = { balance: 1240 }
