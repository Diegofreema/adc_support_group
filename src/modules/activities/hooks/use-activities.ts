import { queryOptions, useQuery } from '@tanstack/react-query'

import { getActivity, listActivities } from '../services/activities.service'

export const activityKeys = {
  all: ['activities'] as const,
  list: (groupId: string) => [...activityKeys.all, 'list', groupId] as const,
  detail: (id: string) => [...activityKeys.all, 'detail', id] as const,
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
