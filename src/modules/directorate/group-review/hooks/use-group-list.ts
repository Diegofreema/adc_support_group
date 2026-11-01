import { useState } from 'react'

import { useGroups } from './use-groups'
import { useFilters } from '../../shared/hooks/use-filters'
import { ALL } from '../../shared/constants/options'
import { countByTab, filterGroups } from '../utils/group-filters'
import type { GroupFilterValues, GroupTab } from '../types'

/** View-model for the groups list: tab, filters, visible rows and counts. */
export function useGroupList() {
  const [tab, setTab] = useState<GroupTab>('pending')
  const { filters, setFilter } = useFilters<GroupFilterValues>({ search: '', state: ALL, category: ALL })
  const groups = useGroups().data ?? []
  return { tab, setTab, filters, setFilter, rows: filterGroups(groups, tab, filters), counts: countByTab(groups) }
}
