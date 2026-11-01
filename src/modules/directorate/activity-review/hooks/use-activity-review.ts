import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { approveActivity, rejectActivity, reviewActivitiesQuery } from '../services/activities.service'
import { useFilters } from '../../shared/hooks/use-filters'
import { ALL } from '../../shared/constants/options'
import { directorateKeys } from '../../shared/query-keys'
import { countByStage, filterActivities } from '../utils/activity-filters'
import type { ActivityFilterValues, ReviewStage } from '../types'
import { notify } from '@/lib/toast'

/** View-model for the review queue. */
export function useActivityQueue() {
  const [stage, setStage] = useState<ReviewStage>('to-check')
  const { filters, setFilter } = useFilters<ActivityFilterValues>({ search: '', type: ALL, state: ALL })
  const activities = useQuery(reviewActivitiesQuery).data ?? []
  return { stage, setStage, filters, setFilter, rows: filterActivities(activities, stage, filters), counts: countByStage(activities) }
}

function useQueueMutation<Args>(fn: (args: Args) => Promise<unknown>, message: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.activities() })
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
