import type { KeyValue } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import type { ActivityDetailsForm } from './activity-schema'
import type { ActivityTypeOption, NewActivityInput } from '../types'

interface Draft {
  type: string
  details: ActivityDetailsForm
  photos: File[]
  videoUrl: string
}

/** Form state → service input. The date stays YYYY-MM-DD. */
export function buildActivityInput({ type, details, photos, videoUrl }: Draft): NewActivityInput {
  return {
    ...details,
    type,
    peopleReached: Number(details.peopleReached),
    note: details.note?.trim() || undefined,
    photos,
    videoUrl: videoUrl.trim() || undefined,
  }
}

/** Rows for the "Check and send" step. */
export function activitySummary({ type, details, photos }: Draft, types: ActivityTypeOption[]): KeyValue[] {
  return [
    { label: 'Activity', value: types.find((option) => option.value === type)?.label ?? type },
    { label: 'Title', value: details.title || '—' },
    { label: 'Date', value: details.date ? formatDay(details.date) : '—' },
    { label: 'Where', value: [details.ward, details.lga, details.state].filter(Boolean).join(', ') || '—' },
    { label: 'People', value: details.peopleReached ? formatNumber(Number(details.peopleReached)) : '—' },
    { label: 'Photos', value: photos.length },
  ]
}
