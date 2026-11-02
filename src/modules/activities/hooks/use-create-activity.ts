import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createActivity } from '../services/activities.service'
import { activityKeys } from './use-activities'
import { useRequiredUser } from '@/stores/session-store'
import type { NewActivityInput } from '../types'

export function useCreateActivity() {
  const user = useRequiredUser()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NewActivityInput) => createActivity(input, user),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: activityKeys.all }),
  })
}
