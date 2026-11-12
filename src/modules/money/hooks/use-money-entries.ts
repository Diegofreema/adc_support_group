import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

import type { TabItem } from '@/components/shared'
import { listEntriesPage } from '../services/money.service'
import type { EntryPage, EntryTab } from '../types'
import { moneyKeys } from '../utils/money-keys'

const TABS: TabItem<EntryTab>[] = [
  { value: 'all', label: 'All' },
  { value: 'dues', label: 'Dues' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expenses' },
]

function nextOffset(last: EntryPage, pages: EntryPage[]): number | undefined {
  const loaded = pages.reduce((sum, page) => sum + page.rows.length, 0)
  return last.rows.length > 0 && loaded < last.total ? loaded : undefined
}

const entriesQuery = (tab: EntryTab) =>
  infiniteQueryOptions({
    queryKey: moneyKeys.entries(tab),
    queryFn: ({ pageParam }) => listEntriesPage(tab === 'all' ? undefined : tab, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextOffset,
  })

/** Records list: tab state + that tab's paged entries. */
export function useMoneyEntries() {
  const [tab, setTab] = useState<EntryTab>('all')
  const query = useInfiniteQuery(entriesQuery(tab))
  return {
    tab, setTab, tabs: TABS,
    entries: query.data?.pages.flatMap((page) => page.rows) ?? [],
    isLoading: query.isLoading,
    error: query.data ? null : query.error,
    retry: () => void query.refetch(),
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
    isLoadingMore: query.isFetchingNextPage,
  }
}
