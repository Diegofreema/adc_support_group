import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { sendBroadcast, sentBroadcastsQuery } from '../services/broadcasts.service'
import { directorateKeys } from '../../shared/query-keys'
import { notify } from '@/lib/toast'
import { formatNumber } from '@/lib/format'

/** Broadcasts already sent; `isLoading` is true only until the first answer arrives. */
export function useSentBroadcasts() {
  const query = useQuery(sentBroadcastsQuery)
  return { sent: query.data ?? [], count: query.data?.length, isLoading: query.isLoading }
}

export function useSendBroadcast() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: sendBroadcast,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.broadcasts() })
      notify(`Sent to ${formatNumber(result.recipients)}`)
    },
  })
}
