import type { PlaceValue } from '@/modules/groups'
import type { ChapterLevel } from '../types'

/** The place a chapter is named after, at its level. */
export function chapterPlace(level: ChapterLevel, place: PlaceValue): string {
  if (level === 'ward') return place.ward
  if (level === 'lga') return place.lga
  return place.state
}

/** "Atiku Women Network · Kaduna" */
export function suggestChapterName(groupName: string, level: ChapterLevel, place: PlaceValue): string {
  const where = chapterPlace(level, place)
  return where ? `${groupName} · ${where}` : ''
}
