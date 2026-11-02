import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { buyPoints, pointPacksQuery, pointsQuery, sendBroadcast, sentBroadcastsQuery } from '../services/broadcasts.service'
import { directorateKeys } from '../../shared/query-keys'
import type { SentBroadcast } from '../types'
import { notify } from '@/lib/toast'
import { formatNumber } from '@/lib/format'

export const usePoints = () => useQuery(pointsQuery).data ?? 0
export const usePointPacks = () => useQuery(pointPacksQuery).data ?? []
export const useSentBroadcasts = () => useQuery(sentBroadcastsQuery).data ?? []

function useInvalidateBroadcasts() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: directorateKeys.all })
}

export function useSendBroadcast() {
  const invalidate = useInvalidateBroadcasts()
  return useMutation({
    mutationFn: ({ message, cost }: { message: Omit<SentBroadcast, 'id' | 'sentAt'>; cost: number }) => sendBroadcast(message, cost),
    onSuccess: (record) => { invalidate(); notify(`Sent to ${formatNumber(record.recipients)}`) },
    onError: (error) => notify(error.message, 'error'),
  })
}

export function useBuyPoints() {
  const invalidate = useInvalidateBroadcasts()
  return useMutation({ mutationFn: buyPoints, onSuccess: () => { invalidate(); notify('Points added') } })
}
