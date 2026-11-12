import { useMutation, useQueryClient } from '@tanstack/react-query'

import { profileQuery } from './use-profile'
import { cancelAccountDeletion, requestAccountDeletion } from '../services/profile.service'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'

/** Ask to delete my details in 7 days, or cancel that ask. Errors go to the global toast. */
export function useAccountDeletion() {
  const user = useRequiredUser()
  const queryClient = useQueryClient()
  const refresh = () => queryClient.invalidateQueries({ queryKey: profileQuery(user.id).queryKey })
  const request = useMutation({
    mutationFn: requestAccountDeletion,
    onSuccess: async () => {
      await refresh()
      notify('Your details will be deleted in 7 days')
    },
  })
  const cancel = useMutation({
    mutationFn: cancelAccountDeletion,
    onSuccess: async () => {
      await refresh()
      notify('Deletion cancelled')
    },
  })
  return {
    request: () => request.mutate(),
    cancel: () => cancel.mutate(),
    isPending: request.isPending || cancel.isPending,
  }
}
