import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { groupCountsQuery, groupsQuery } from '../services/groups.service'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useFilters } from '../../shared/hooks/use-filters'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'
import { useCategoryOptions } from '../../shared/hooks/use-lookups'
import { ALL } from '../../shared/constants/options'
import type { GroupFilterValues, GroupTab } from '../types'

const NO_COUNTS: Record<GroupTab, number> = { pending: 0, verified: 0, rejected: 0, suspended: 0 }

/** View-model for the groups list: tab, filters (applied by the server), one page of rows and counts. */
export function useGroupList() {
  const [tab, setTab] = useState<GroupTab>('pending')
  const { filters, setFilter } = useFilters<GroupFilterValues>({ search: '', state: ALL, category: ALL })
  const search = useDebouncedValue(filters.search)
  const args = { status: tab, search, state: filters.state, categoryId: filters.category }
  const paging = usePaging(JSON.stringify(args))
  const list = useQuery({ ...groupsQuery(args, paging.pageSize, paging.offset), placeholderData: keepPreviousData })
  useKeepPageInRange(paging, list.data?.total)
  const counts = useQuery(groupCountsQuery).data ?? NO_COUNTS
  const categoryOptions = useCategoryOptions()
  return { tab, setTab, filters, setFilter, categoryOptions, rows: list.data?.rows ?? [], total: list.data?.total ?? 0, paging, counts, isLoading: list.isLoading }
}
