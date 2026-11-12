import { queryOptions, useQuery } from '@tanstack/react-query'

import { getActivity, listActivityTypes, listActivityVersions, listChapterOptions } from '../services/activities.service'
import { activityKeys } from '../utils/activity-keys'

export { activityKeys }

/** Read again on every visit: someone else may have edited, approved or sent it back. */
export const activityQuery = (id: string) =>
  queryOptions({ queryKey: activityKeys.detail(id), queryFn: () => getActivity(id), staleTime: 0 })

export function useActivity(id: string) {
  return useQuery(activityQuery(id))
}

export function useActivityTypes() {
  return useQuery(queryOptions({ queryKey: activityKeys.types(), queryFn: listActivityTypes, staleTime: 10 * 60_000 }))
}

/** Chapters the wizard can file an activity under (none for an unverified group). */
export function useActivityChapters() {
  return useQuery(queryOptions({ queryKey: activityKeys.chapters(), queryFn: listChapterOptions, staleTime: 5 * 60_000 }))
}

/** Earlier versions; only fetched once the activity has been edited. */
export function useActivityVersions(id: string, edited: boolean) {
  return useQuery(queryOptions({ queryKey: activityKeys.versions(id), queryFn: () => listActivityVersions(id), enabled: edited }))
}
