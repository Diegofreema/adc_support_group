import { useMutation, useQueryClient } from '@tanstack/react-query'

import { notify } from '@/lib/toast'
import { saveVotingArea } from '../services/voting-area.service'
import type { VotingArea } from '../types'

/** Save the chosen polling unit; `onSaved` runs after the session is refreshed. */
export function useSaveVotingArea(onSaved?: (area: VotingArea) => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveVotingArea,
    onSuccess: (area) => {
      void queryClient.invalidateQueries({ queryKey: ['profile'] })
      notify('Voting area saved')
      onSaved?.(area)
    },
    onError: (error: Error) => notify(error.message, 'error'),
  })
}
