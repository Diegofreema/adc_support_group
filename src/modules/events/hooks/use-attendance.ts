import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { listAttendancePage } from '../services/attendance.service'
import { eventKeys } from '../utils/event-keys'
import type { AttendanceFilter, AttendancePage } from '../types'
import { useDebouncedValue } from '@/hooks/use-debounced-value'

function nextOffset(last: AttendancePage, pages: AttendancePage[]): number | undefined {
  const loaded = pages.reduce((sum, page) => sum + page.rows.length, 0)
  return last.rows.length > 0 && loaded < last.total ? loaded : undefined
}

const attendanceQuery = (eventId: string, filter: AttendanceFilter, search: string) =>
  infiniteQueryOptions({
    queryKey: eventKeys.attendance(eventId, filter, search),
    queryFn: ({ pageParam }) => listAttendancePage(eventId, filter, search, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextOffset,
  })

/** The organiser's list: filter pills, search, paged rows and the counts. */
export function useAttendance(eventId: string) {
  const [filter, setFilter] = useState<AttendanceFilter>('all')
  const [search, setSearch] = useState('')
  const settledSearch = useDebouncedValue(search.trim())
  const query = useInfiniteQuery(attendanceQuery(eventId, filter, settledSearch))
  const first = query.data?.pages[0]

  return {
    filter, setFilter, search, setSearch,
    people: query.data?.pages.flatMap((page) => page.rows) ?? [],
    counts: first && { coming: first.comingCount, present: first.presentCount },
    isLoading: query.isLoading,
    error: query.data ? null : query.error,
    retry: () => void query.refetch(),
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
    isLoadingMore: query.isFetchingNextPage,
  }
}
