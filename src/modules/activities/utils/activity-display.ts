import { formatDay } from '@/lib/format'
import type { Activity } from '@/types/domain'

const TODAY = new Date().toDateString()

/** "Today", or "24 Oct". */
export function activityDayLabel(iso: string): string {
  return new Date(iso).toDateString() === TODAY ? 'Today' : formatDay(iso)
}

/** "Kofar Mata, Kano" */
export function activityPlace(activity: Activity): string {
  return [activity.ward, activity.state].filter(Boolean).join(', ')
}


/** Exactly `count` tones for the feed mosaic, repeating when there are fewer photos. */
export function mediaTones<T>(tones: T[], count: number): T[] {
  if (tones.length === 0) return []
  return Array.from({ length: count }, (_, index) => tones[index % tones.length]!)
}
