import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { listDuesStatusPage } from '../services/dues-status.service'
import type { DuesFilter, DuesPeriod, DuesStatusPage } from '../types'
import { moneyKeys } from '../utils/money-keys'
import { shiftPeriod } from '../utils/periods'
import { useDebouncedValue } from '@/hooks/use-debounced-value'

function nextOffset(last: DuesStatusPage, pages: DuesStatusPage[]): number | undefined {
  const loaded = pages.reduce((sum, page) => sum + page.rows.length, 0)
  return last.rows.length > 0 && loaded < last.total ? loaded : undefined
}

const statusQuery = (period: string, filter: DuesFilter, search: string) =>
  infiniteQueryOptions({
    queryKey: moneyKeys.duesStatus(period, filter, search),
    queryFn: ({ pageParam }) => listDuesStatusPage(period, filter, search, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextOffset,
  })

/** Who has paid a period: period arrows, filter pills, search, paged rows. */
export function useDuesStatus(current: string, period: DuesPeriod, startOn?: string) {
  const [shown, setShown] = useState(current)
  const [filter, setFilter] = useState<DuesFilter>('unpaid')
  const [search, setSearch] = useState('')
  const settled = useDebouncedValue(search.trim())
  const query = useInfiniteQuery(statusQuery(shown, filter, settled))
  const first = query.data?.pages[0]
  const previous = shiftPeriod(shown, period, -1)

  return {
    period: shown,
    label: first?.label,
    canGoBack: !startOn || previous >= startOn,
    goBack: () => setShown(previous),
    goNext: () => setShown(shiftPeriod(shown, period, 1)),
    filter, setFilter, search, setSearch,
    counts: first && { paid: first.paidCount, members: first.memberCount },
    people: query.data?.pages.flatMap((page) => page.rows) ?? [],
    isLoading: query.isLoading,
    error: query.data ? null : query.error,
    retry: () => void query.refetch(),
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
    isLoadingMore: query.isFetchingNextPage,
  }
}
