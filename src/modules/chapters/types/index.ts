import type { ActivityStatus, Chapter } from '@/types/domain'
import type { ActivityTypeId } from '@/config/activity-types'

export interface ChapterRecord extends Chapter {
  lgaCount: number
}

export type ChapterLevel = 'state' | 'lga' | 'ward'

/** Short activity row shown on a chapter page. */
export interface ChapterActivity {
  id: string
  chapterId: string
  type: ActivityTypeId
  title: string
  date: string
  reach: string
  status: ActivityStatus
}

export interface NewChapterInput {
  level: ChapterLevel
  state: string
  lga?: string
  ward?: string
  name: string
  coordinatorPhone: string
}
