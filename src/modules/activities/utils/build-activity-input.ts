import type { KeyValue } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import type { ActivityDetailsForm } from './activity-schema'
import type { ActivityTypeOption, ChapterOption, GeoFix, NewActivityInput, PickedPhoto } from '../types'

export interface Draft {
  type: string
  details: ActivityDetailsForm
  photos: PickedPhoto[]
  videoUrl: string
  location?: GeoFix
  forProfileId?: string
}

/** Form state → service input. The date stays YYYY-MM-DD; uploaded photos are kept, new files uploaded. */
export function buildActivityInput({ type, details, photos, videoUrl, location, forProfileId }: Draft): NewActivityInput {
  return {
    ...details,
    type,
    peopleReached: Number(details.peopleReached),
    note: details.note?.trim() || undefined,
    chapterId: details.chapterId || undefined,
    photos: photos.flatMap((photo) => (photo.file ? [photo.file] : [])),
    keptPhotoUrls: photos.flatMap((photo) => (photo.file ? [] : [photo.preview])),
    videoUrl: videoUrl.trim() || undefined,
    location,
    forProfileId,
  }
}

/** Rows for the "Check and send" step. */
export interface SummaryLookups {
  types: ActivityTypeOption[]
  chapters: ChapterOption[]
  defaultChapterLabel: string
  /** Name of the member it is recorded for, when not yourself. */
  forName?: string
}

export function activitySummary({ type, details, photos }: Draft, { types, chapters, defaultChapterLabel, forName }: SummaryLookups): KeyValue[] {
  const chapter = chapters.find((option) => option.value === details.chapterId)?.label ?? defaultChapterLabel
  const rows: (KeyValue | false)[] = [
    Boolean(forName) && { label: 'For', value: forName },
    { label: 'Activity', value: types.find((option) => option.value === type)?.label ?? type },
    { label: 'Chapter', value: chapter },
    { label: 'Title', value: details.title || '—' },
    { label: 'Date', value: details.date ? formatDay(details.date) : '—' },
    { label: 'Where', value: [details.ward, details.lga, details.state].filter(Boolean).join(', ') || '—' },
    { label: 'People', value: details.peopleReached ? formatNumber(Number(details.peopleReached)) : '—' },
    { label: 'Photos', value: photos.length },
  ]
  return rows.filter((row): row is KeyValue => Boolean(row))
}
