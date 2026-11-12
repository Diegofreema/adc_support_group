import type { ActivityTab } from '../types'

/** Query keys; everything sits under `all`, so one invalidation refreshes lists, counts and drafts. */
export const activityKeys = {
  all: ['activities'] as const,
  list: (groupId: string, tab: ActivityTab) => [...activityKeys.all, 'list', groupId, tab] as const,
  reviewCount: (groupId: string) => [...activityKeys.all, 'review-count', groupId] as const,
  drafts: (userId: string) => [...activityKeys.all, 'drafts', userId] as const,
  detail: (id: string) => [...activityKeys.all, 'detail', id] as const,
  versions: (id: string) => [...activityKeys.all, 'versions', id] as const,
  types: () => [...activityKeys.all, 'types'] as const,
  chapters: () => [...activityKeys.all, 'chapters'] as const,
}
