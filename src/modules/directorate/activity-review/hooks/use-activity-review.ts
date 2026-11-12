import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { approveActivity, rejectActivity, reviewActivitiesQuery, stageCountsQuery } from '../services/activities.service'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { useFilters } from '../../shared/hooks/use-filters'
import { useKeepPageInRange, usePaging } from '../../shared/hooks/use-paging'
import { useActivityTypeOptions } from '../../shared/hooks/use-lookups'
import { ALL } from '../../shared/constants/options'
import { directorateKeys } from '../../shared/query-keys'
import type { ActivityFilterValues, ReviewStage } from '../types'
import { notify } from '@/lib/toast'

const NO_COUNTS: Record<ReviewStage, number> = { 'to-check': 0, checked: 0, rejected: 0 }

/** View-model for the review queue; filters are applied by the server. */
export function useActivityQueue() {
  const [stage, setStage] = useState<ReviewStage>('to-check')
  const { filters, setFilter } = useFilters<ActivityFilterValues>({ search: '', type: ALL, state: ALL })
  const search = useDebouncedValue(filters.search)
  const applied = { ...filters, search }
  const paging = usePaging(JSON.stringify([stage, applied]))
  const list = useQuery({ ...reviewActivitiesQuery(stage, applied, paging.pageSize, paging.offset), placeholderData: keepPreviousData }).data
  useKeepPageInRange(paging, list?.total)
  const counts = useQuery(stageCountsQuery).data ?? NO_COUNTS
  const typeOptions = useActivityTypeOptions()
  return { stage, setStage, filters, setFilter, typeOptions, rows: list?.rows ?? [], total: list?.total ?? 0, paging, counts }
}

function useQueueMutation<Args>(fn: (args: Args) => Promise<unknown>, message: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.activities() })
      queryClient.invalidateQueries({ queryKey: [...directorateKeys.all, 'dashboard'] })
      notify(message)
    },
  })
}

export function useApproveActivity() {
  return useQueueMutation((id: string) => approveActivity(id), 'Approved')
}

export function useRejectActivity() {
  return useQueueMutation(({ id, reason }: { id: string; reason: string }) => rejectActivity(id, reason), 'Sent back')
}
