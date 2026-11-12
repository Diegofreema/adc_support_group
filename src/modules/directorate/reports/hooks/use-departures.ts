import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { departuresQuery } from '../services/departures.service'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'
import type { DepartureFilter } from '../types'

/** Rows per page on the "Members who left" log. */
const DEPARTURES_PAGE_SIZE = 30

/** The "Members who left" log: filter + one page of rows. */
export function useDepartures() {
  const [kind, setKind] = useState<DepartureFilter>('all')
  const paging = usePaging(kind, DEPARTURES_PAGE_SIZE)
  const query = useQuery({ ...departuresQuery(kind, paging.pageSize, paging.offset), placeholderData: keepPreviousData })
  useKeepPageInRange(paging, query.data?.total)
  return {
    kind, setKind, paging,
    rows: query.data?.rows ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    retry: () => void query.refetch(),
  }
}
