import type { ChapterRecord } from '../types'

export function searchChapters(chapters: ChapterRecord[], search: string): ChapterRecord[] {
  const needle = search.trim().toLowerCase()
  if (!needle) return chapters
  return chapters.filter((chapter) => `${chapter.name} ${chapter.coordinatorName}`.toLowerCase().includes(needle))
}
