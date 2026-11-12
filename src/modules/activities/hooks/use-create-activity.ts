import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { createActivity } from '../services/activity-drafts.service'
import { activityKeys } from './use-activities'
import { notify } from '@/lib/toast'
import type { NewActivityInput } from '../types'

const SAVED_ON_PHONE = 'Saved on your phone. It will send when you have signal.'

/** Record a new activity. With no signal it is saved on the phone and the wizard closes. */
export function useCreateActivity() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input: NewActivityInput) => createActivity(input),
    // Offline is a normal case here: run anyway, so the draft gets saved.
    networkMode: 'always',
    onSuccess: async (result) => {
      if (result.kind === 'saved') {
        notify(SAVED_ON_PHONE)
        await navigate({ to: '/activities' })
      }
      return queryClient.invalidateQueries({ queryKey: activityKeys.all })
    },
  })
}
