import { queryOptions, useQuery } from '@tanstack/react-query'

import { memberKeys } from './query-keys'
import { fetchChapterOptions, fetchMembers } from '../services/members.service'

export const membersQuery = (groupId: string) =>
  queryOptions({ queryKey: memberKeys.list(groupId), queryFn: () => fetchMembers(groupId) })

export const chapterOptionsQuery = (groupId: string) =>
  queryOptions({ queryKey: memberKeys.chapters(groupId), queryFn: () => fetchChapterOptions(groupId) })

export function useMembers(groupId: string) {
  return useQuery(membersQuery(groupId))
}

export function useChapterOptions(groupId: string) {
  return useQuery(chapterOptionsQuery(groupId))
}
