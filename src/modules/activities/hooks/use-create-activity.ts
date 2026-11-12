import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createActivity } from '../services/activities.service'
import { activityKeys } from './use-activities'
import type { NewActivityInput } from '../types'

export function useCreateActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NewActivityInput) => createActivity(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: activityKeys.all }),
  })
}
