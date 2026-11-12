import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { leaveGroup } from '../services/profile.service'
import { notify } from '@/lib/toast'

/** Leave the group, refresh who the user is, then go home. Errors go to the global toast. */
export function useLeaveGroup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: leaveGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      notify('You left the group')
      void navigate({ to: '/home' })
    },
  })
}
