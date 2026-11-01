import { useMutation, useQueryClient } from '@tanstack/react-query'

import { switchActiveGroup } from '../services/home.service'
import { notify } from '@/lib/toast'

/** Switch the active group, then refresh every screen's data. */
export function useSwitchGroup(onDone: () => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: switchActiveGroup,
    onSuccess: () => {
      queryClient.invalidateQueries()
      notify('Switched')
      onDone()
    },
  })
}
