import { useMutation, useQueryClient } from '@tanstack/react-query'

import { groupKeys } from './query-keys'
import { regenerateJoinCode, requestHandover } from '../services/groups.service'
import { notify } from '@/lib/toast'

export function useRegenerateJoinCode(groupId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => regenerateJoinCode(groupId),
    onSuccess: (group) => {
      queryClient.setQueryData(groupKeys.detail(groupId), group)
      notify('New link ready')
    },
  })
}

export function useRequestHandover(groupId: string) {
  return useMutation({
    mutationFn: (newLeader: string) => requestHandover(groupId, newLeader),
    onSuccess: () => notify('Request sent'),
    onError: (error) => notify(error.message, 'error'),
  })
}
