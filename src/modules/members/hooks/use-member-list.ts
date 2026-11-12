import { useMemo, useState } from 'react'

import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useChapterOptions, useMemberPage } from './use-members'
import type { MemberFilter, MemberPage } from '../types'
import { buildFilterOptions, showsLeader } from '../utils/filters'
import { serverPage } from '../utils/paginate'

const PAGE_SIZE = 20

/** The leader, when this filter and search include them (they sit on top of page 1). */
function leaderFor(data: MemberPage | undefined, filter: MemberFilter, search: string) {
  return data?.leader && showsLeader(data.leader, filter, search) ? data.leader : null
}

/** Search, filter and paging state for the members screen; the backend filters and pages. */
export function useMemberList(groupId: string) {
  const chapters = useChapterOptions(groupId)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<MemberFilter>('all')
  const [page, setPage] = useState(1)
  const query = { filter, search: useDebouncedValue(search), limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }
  const members = useMemberPage(groupId, query)
  const filterOptions = useMemo(() => buildFilterOptions(chapters.data ?? []), [chapters.data])

  const total = members.data?.total ?? 0
  const pageData = serverPage(members.data?.rows ?? [], total, page, PAGE_SIZE)
  const leader = leaderFor(members.data, filter, query.search)

  // A removal can empty the last page; step back to the new last one (state adjusted while rendering, no effect).
  if (members.data && !members.isPlaceholderData && page > pageData.pageCount) setPage(pageData.pageCount)

  const resetPageAnd = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value)
    setPage(1)
  }

  return {
    isLoading: members.isLoading,
    error: members.error,
    retry: () => void members.refetch(),
    /** People matching the filter and search, the leader included. */
    count: total + (leader ? 1 : 0),
    rows: leader && page === 1 ? [leader, ...pageData.items] : pageData.items,
    pageData,
    /** The search the current rows were loaded with (for export). */
    query,
    search, setSearch: resetPageAnd(setSearch),
    filter, setFilter: resetPageAnd(setFilter),
    filterOptions, setPage,
  }
}
