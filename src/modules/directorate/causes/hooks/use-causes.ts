import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { causesQuery, createCause, updateCause } from '../services/causes.service'
import { directorateKeys } from '../../shared/query-keys'
import type { CauseInput } from '../types'
import { notify } from '@/lib/toast'

export function useCauses() {
  return useQuery(causesQuery).data ?? []
}

/** Create when there's no id, update otherwise. */
export function useSaveCause() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: CauseInput }) => (id ? updateCause(id, input) : createCause(input)),
    onSuccess: (_cause, { id }) => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.causes() })
      notify(id ? 'Cause updated' : 'Cause created')
    },
  })
}
