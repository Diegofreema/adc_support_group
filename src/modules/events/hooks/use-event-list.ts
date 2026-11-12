import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

import { listEventPage } from '../services/events.service'
import { eventKeys } from '../utils/event-keys'
import type { EventPage, EventWhen } from '../types'

/** Offset of the next page, or undefined once every row is loaded. */
function nextOffset(last: EventPage, pages: EventPage[]): number | undefined {
  const loaded = pages.reduce((sum, page) => sum + page.rows.length, 0)
  return last.rows.length > 0 && loaded < last.total ? loaded : undefined
}

export const eventListQuery = (groupId: string, when: EventWhen) =>
  infiniteQueryOptions({
    queryKey: eventKeys.list(groupId, when),
    queryFn: ({ pageParam }) => listEventPage(when, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextOffset,
  })

/** Upcoming or past events, 20 at a time from the server. */
export function useEventList(groupId: string, when: EventWhen) {
  const query = useInfiniteQuery(eventListQuery(groupId, when))
  return {
    events: query.data?.pages.flatMap((page) => page.rows) ?? [],
    total: query.data?.pages[0]?.total,
    isLoading: query.isLoading,
    error: query.data ? null : query.error,
    retry: () => void query.refetch(),
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
    isLoadingMore: query.isFetchingNextPage,
  }
}
