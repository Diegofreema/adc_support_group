import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ALL } from '../../shared/constants/options'
import { useFilters } from '../../shared/hooks/use-filters'
import { useCategoryOptions } from '../../shared/hooks/use-lookups'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'
import { leaderboardQuery } from '../services/leaderboard.service'
import type { BoardMeasure, LeaderboardFilters } from '../types'

/** Rows per page on the staff leaderboard (the RPC allows up to 100). */
const LEADERBOARD_PAGE_SIZE = 30

/** The staff leaderboard: state + category filters, measure, one page of ranked groups. */
export function useLeaderboard() {
  const { filters, setFilter } = useFilters<LeaderboardFilters>({ state: ALL, category: ALL })
  const [measure, setMeasure] = useState<BoardMeasure>('activities')
  const paging = usePaging(JSON.stringify({ filters, measure }), LEADERBOARD_PAGE_SIZE)
  const query = useQuery({ ...leaderboardQuery(filters, measure, paging.pageSize, paging.offset), placeholderData: keepPreviousData })
  useKeepPageInRange(paging, query.data?.total)
  return {
    filters, setFilter, measure, setMeasure, paging,
    categoryOptions: useCategoryOptions(),
    rows: query.data?.rows ?? [],
    total: query.data?.total ?? 0,
    snapshotOn: query.data?.snapshotOn,
    isLoading: query.isLoading,
    error: query.error,
    retry: () => void query.refetch(),
  }
}
