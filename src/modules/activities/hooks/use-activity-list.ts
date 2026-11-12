import { infiniteQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { listActivityPage } from '../services/activities.service'
import { activityKeys } from '../utils/activity-keys'
import type { ActivityPage, ActivityTab } from '../types'

/** Offset of the next page, or undefined once every row is loaded. */
function nextOffset(last: ActivityPage, pages: ActivityPage[]): number | undefined {
  const loaded = pages.reduce((sum, page) => sum + page.rows.length, 0)
  return last.rows.length > 0 && loaded < last.total ? loaded : undefined
}

const activityListQuery = (groupId: string, tab: ActivityTab) =>
  infiniteQueryOptions({
    queryKey: activityKeys.list(groupId, tab),
    queryFn: ({ pageParam }) => listActivityPage(tab, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextOffset,
  })

/** One tab's list, 20 at a time from the server. */
export function useActivityList(groupId: string, tab: ActivityTab) {
  const query = useInfiniteQuery(activityListQuery(groupId, tab))
  return {
    activities: query.data?.pages.flatMap((page) => page.rows) ?? [],
    total: query.data?.pages[0]?.total,
    isLoading: query.isLoading,
    error: query.data ? null : query.error,
    retry: () => void query.refetch(),
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
    isLoadingMore: query.isFetchingNextPage,
  }
}

/** How many wait for review: a one-row read, so the tab badge costs almost no data. */
export function useReviewCount(groupId: string, enabled: boolean) {
  return useQuery({
    queryKey: activityKeys.reviewCount(groupId),
    queryFn: async () => (await listActivityPage('review', 0, 1)).total,
    enabled,
  }).data
}
