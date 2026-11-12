import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { groupCountsQuery, groupsQuery } from '../services/groups.service'
import { useDebouncedValue } from '../../shared/hooks/use-debounced-value'
import { useFilters } from '../../shared/hooks/use-filters'
import { useCategoryOptions } from '../../shared/hooks/use-lookups'
import { ALL } from '../../shared/constants/options'
import type { GroupFilterValues, GroupTab } from '../types'

const NO_COUNTS: Record<GroupTab, number> = { pending: 0, verified: 0, rejected: 0, suspended: 0 }

/** View-model for the groups list: tab, filters (applied by the server), visible rows and counts. */
export function useGroupList() {
  const [tab, setTab] = useState<GroupTab>('pending')
  const { filters, setFilter } = useFilters<GroupFilterValues>({ search: '', state: ALL, category: ALL })
  const search = useDebouncedValue(filters.search)
  const list = useQuery({ ...groupsQuery({ status: tab, search, state: filters.state, categoryId: filters.category }), placeholderData: keepPreviousData })
  const counts = useQuery(groupCountsQuery).data ?? NO_COUNTS
  const categoryOptions = useCategoryOptions()
  return { tab, setTab, filters, setFilter, categoryOptions, rows: list.data ?? [], counts, isLoading: list.isLoading }
}
