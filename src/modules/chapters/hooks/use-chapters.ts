import { queryOptions, useQuery } from '@tanstack/react-query'

import { chapterKeys } from './query-keys'
import { fetchChapter, fetchChapterActivities, fetchChapters } from '../services/chapters.service'

export const chaptersQuery = (groupId: string) =>
  queryOptions({ queryKey: chapterKeys.list(groupId), queryFn: () => fetchChapters(groupId) })

export const chapterQuery = (chapterId: string) =>
  queryOptions({ queryKey: chapterKeys.detail(chapterId), queryFn: () => fetchChapter(chapterId) })

export const chapterActivitiesQuery = (chapterId: string) =>
  queryOptions({ queryKey: chapterKeys.activities(chapterId), queryFn: () => fetchChapterActivities(chapterId) })

export function useChapters(groupId: string) {
  return useQuery(chaptersQuery(groupId))
}

export function useChapter(chapterId: string) {
  return useQuery(chapterQuery(chapterId))
}

export function useChapterActivities(chapterId: string) {
  return useQuery(chapterActivitiesQuery(chapterId))
}
