import { useMemo, useState } from 'react'

import { useChapterOptions, useMembers } from './use-members'
import type { MemberFilter } from '../types'
import { buildFilterOptions, filterMembers } from '../utils/filters'
import { paginate } from '../utils/paginate'

const PAGE_SIZE = 8

/** Search, filter and paging state for the members screen. */
export function useMemberList(groupId: string) {
  const members = useMembers(groupId)
  const chapters = useChapterOptions(groupId)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<MemberFilter>('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => filterMembers(members.data ?? [], filter, search), [members.data, filter, search])
  const filterOptions = useMemo(() => buildFilterOptions(chapters.data ?? []), [chapters.data])

  const resetPageAnd = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value)
    setPage(1)
  }

  return {
    isLoading: members.isLoading,
    all: members.data ?? [],
    filtered,
    pageData: paginate(filtered, page, PAGE_SIZE),
    search, setSearch: resetPageAnd(setSearch),
    filter, setFilter: resetPageAnd(setFilter),
    filterOptions, setPage,
  }
}
