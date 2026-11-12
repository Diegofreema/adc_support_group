import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { causesQuery, saveCause, setCauseStatus } from '../services/causes.service'
import { directorateKeys } from '../../shared/query-keys'
import type { CauseInput } from '../types'
import { notify } from '@/lib/toast'
import type { CauseStatus } from '@/types/domain'

/** All causes; `isLoading` is true only until the first answer arrives. */
export function useCauses() {
  const query = useQuery(causesQuery)
  return { causes: query.data ?? [], isLoading: query.isLoading }
}

function useInvalidateCauses() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: directorateKeys.causes() })
    queryClient.invalidateQueries({ queryKey: [...directorateKeys.payments(), 'by-cause'] })
  }
}

/** Create when there's no id, update otherwise. */
export function useSaveCause() {
  const invalidate = useInvalidateCauses()
  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: CauseInput }) => saveCause(id, input),
    onSuccess: (_id, { id }) => { invalidate(); notify(id ? 'Cause updated' : 'Cause created') },
  })
}

/** Close a cause (groups stop seeing it) or open it again. */
export function useSetCauseStatus() {
  const invalidate = useInvalidateCauses()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CauseStatus }) => setCauseStatus(id, status),
    onSuccess: (_data, { status }) => { invalidate(); notify(status === 'closed' ? 'Cause closed' : 'Cause reopened') },
  })
}
