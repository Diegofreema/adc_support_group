import { useMutation, useQueryClient } from '@tanstack/react-query'

import { approveActivity, rejectActivity } from '../services/activities.service'
import { activityKeys } from './use-activities'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'
import type { RejectInput } from '../types'

function useInvalidateActivities() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: activityKeys.all })
}

export function useApproveActivity() {
  const user = useRequiredUser()
  const invalidate = useInvalidateActivities()
  return useMutation({
    mutationFn: (id: string) => approveActivity(id, user),
    onSuccess: () => { notify('Approved'); return invalidate() },
  })
}

export function useRejectActivity() {
  const invalidate = useInvalidateActivities()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: RejectInput }) => rejectActivity(id, input),
    onSuccess: () => { notify('Sent back'); return invalidate() },
  })
}
