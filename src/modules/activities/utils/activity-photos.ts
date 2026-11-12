import type { Activity, PhotoTone } from '@/types/domain'

/** One photo slot: a real image, or a coloured placeholder. */
export interface ActivityPhoto {
  url?: string
  tone: PhotoTone
}

function seed(id: string): number {
  let hash = 0
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash
}

/** Stable placeholder colours: one per photo, or a single one when there are none. */
export function placeholderTones(id: string, count: number): PhotoTone[] {
  const start = seed(id)
  return Array.from({ length: Math.max(count, 1) }, (_, index) => (((start + index) % 6) + 1) as PhotoTone)
}

/** Real photos when uploaded; otherwise the placeholder tones. */
export function activityPhotos(activity: Activity): ActivityPhoto[] {
  const urls = activity.photoUrls ?? []
  if (urls.length === 0) return activity.photoTones.map((tone) => ({ tone }))
  return urls.map((url, index) => ({ url, tone: activity.photoTones[index % activity.photoTones.length] ?? 1 }))
}
