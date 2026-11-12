import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { groupHistoryQuery } from '../services/group-history.service'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'

/** Rows per page on a group's history card. */
const HISTORY_PAGE_SIZE = 20

/** One page of a group's audit log. */
export function useGroupHistory(groupId: string) {
  const paging = usePaging(groupId, HISTORY_PAGE_SIZE)
  const query = useQuery({ ...groupHistoryQuery(groupId, paging.pageSize, paging.offset), placeholderData: keepPreviousData })
  useKeepPageInRange(paging, query.data?.total)
  return { entries: query.data?.rows ?? [], total: query.data?.total ?? 0, paging, isLoading: query.isLoading, error: query.error, retry: () => void query.refetch() }
}
