import { queryOptions, useQuery } from '@tanstack/react-query'

import { getActivity, listActivities, listActivityTypes, listActivityVersions, listChapterOptions } from '../services/activities.service'

export const activityKeys = {
  all: ['activities'] as const,
  list: (groupId: string) => [...activityKeys.all, 'list', groupId] as const,
  detail: (id: string) => [...activityKeys.all, 'detail', id] as const,
  versions: (id: string) => [...activityKeys.all, 'versions', id] as const,
  types: () => [...activityKeys.all, 'types'] as const,
  chapters: () => [...activityKeys.all, 'chapters'] as const,
}

export const activitiesQuery = (groupId: string) =>
  queryOptions({ queryKey: activityKeys.list(groupId), queryFn: () => listActivities(groupId) })

export const activityQuery = (id: string) =>
  queryOptions({ queryKey: activityKeys.detail(id), queryFn: () => getActivity(id) })

export function useActivities(groupId: string) {
  return useQuery(activitiesQuery(groupId))
}

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
