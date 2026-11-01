import type { KeyValue } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import type { PhotoTone } from '@/types/domain'
import { activityTypeLabel } from './activity-types'
import type { ActivityDetailsForm } from './activity-schema'
import type { ActivityTypeId, NewActivityInput } from '../types'

interface Draft {
  type: ActivityTypeId
  details: ActivityDetailsForm
  photoTones: PhotoTone[]
  videoUrl: string
}

/** Form state → service input. */
export function buildActivityInput({ type, details, photoTones, videoUrl }: Draft): NewActivityInput {
  return {
    ...details,
    type,
    peopleReached: Number(details.peopleReached),
    date: new Date(details.date).toISOString(),
    photoTones,
    videoUrl: videoUrl.trim() || undefined,
  }
}

/** Rows for the "Check and send" step. */
export function activitySummary({ type, details, photoTones }: Draft): KeyValue[] {
  return [
    { label: 'Activity', value: activityTypeLabel(type) },
    { label: 'Title', value: details.title || '—' },
    { label: 'Date', value: details.date ? formatDay(details.date) : '—' },
    { label: 'Where', value: [details.ward, details.lga, details.state].filter(Boolean).join(', ') || '—' },
    { label: 'People', value: details.peopleReached ? formatNumber(Number(details.peopleReached)) : '—' },
    { label: 'Photos', value: photoTones.length },
  ]
}
