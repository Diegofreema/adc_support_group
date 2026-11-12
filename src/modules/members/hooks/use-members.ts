import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { memberKeys } from './query-keys'
import { fetchChapterOptions, fetchMemberPage } from '../services/members.service'
import type { RosterQuery } from '../types'

/** One roster page; the previous page stays on screen while the next loads. */
export const memberPageQuery = (groupId: string, query: RosterQuery) =>
  queryOptions({
    queryKey: memberKeys.page(groupId, query),
    queryFn: () => fetchMemberPage(groupId, query),
    placeholderData: keepPreviousData,
  })

export const chapterOptionsQuery = (groupId: string) =>
  queryOptions({ queryKey: memberKeys.chapters(groupId), queryFn: () => fetchChapterOptions(groupId) })

export function useMemberPage(groupId: string, query: RosterQuery) {
  return useQuery(memberPageQuery(groupId, query))
}

export function useChapterOptions(groupId: string) {
  return useQuery(chapterOptionsQuery(groupId))
}
