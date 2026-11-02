import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { buyPoints, getPointsBalance, listAudiences, listSentMessages, sendMessage } from '../services/messages.service'
import type { NewMessageInput } from '../types'

export const messageKeys = {
  all: ['messages'] as const,
  audiences: () => [...messageKeys.all, 'audiences'] as const,
  sent: () => [...messageKeys.all, 'sent'] as const,
  points: () => [...messageKeys.all, 'points'] as const,
}

export function useAudiences() {
  return useQuery(queryOptions({ queryKey: messageKeys.audiences(), queryFn: listAudiences }))
}

export function useSentMessages() {
  return useQuery(queryOptions({ queryKey: messageKeys.sent(), queryFn: listSentMessages }))
}

export function usePointsBalance() {
  return useQuery(queryOptions({ queryKey: messageKeys.points(), queryFn: getPointsBalance }))
}

function useInvalidateMessages() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: messageKeys.all })
}

export function useSendMessage() {
  return useMutation({ mutationFn: (input: NewMessageInput) => sendMessage(input), onSuccess: useInvalidateMessages() })
}

export function useBuyPoints() {
  return useMutation({ mutationFn: buyPoints, onSuccess: useInvalidateMessages() })
}
