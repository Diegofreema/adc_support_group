import type { SegmentOption } from '@/components/shared'
import type { Audience, Channel } from '../types'

export const CHANNEL_OPTIONS: SegmentOption<Channel>[] = [
  { value: 'free', label: 'App + Email' },
  { value: 'sms', label: 'SMS' },
]

export const CHANNEL_LABEL: Record<Channel, string> = { free: 'App + Email', sms: 'SMS' }

export const AUDIENCE_LABEL: Record<Audience, string> = {
  all: 'All members',
  chapter: 'One chapter',
  executives: 'Executives',
}
