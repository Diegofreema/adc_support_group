import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { buyPoints, getPointsBalance, listAudiences, listChapterAudiences, listSentMessages, sendMessage, waitForPurchase } from '../services/messages.service'
import type { NewMessageInput } from '../types'

export const messageKeys = {
  all: ['messages'] as const,
  audiences: () => [...messageKeys.all, 'audiences'] as const,
  chapters: () => [...messageKeys.all, 'chapters'] as const,
  sent: () => [...messageKeys.all, 'sent'] as const,
  points: () => [...messageKeys.all, 'points'] as const,
  // Outside 'messages' so invalidating the screen never re-verifies a purchase.
  purchase: (reference: string) => ['sms-purchase', reference] as const,
}

export function useAudiences() {
  return useQuery(queryOptions({ queryKey: messageKeys.audiences(), queryFn: listAudiences }))
}

export function useChapterAudiences() {
  return useQuery(queryOptions({ queryKey: messageKeys.chapters(), queryFn: listChapterAudiences }))
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

/** Resolves to the Funz payment page; the caller redirects there. */
export function useBuyPoints() {
  return useMutation({ mutationFn: buyPoints })
}

/** Checks a returning purchase once; the service waits while it clears. */
export function usePurchaseStatus(reference: string | null) {
  return useQuery({
    queryKey: messageKeys.purchase(reference ?? ''),
    queryFn: () => waitForPurchase(reference!),
    enabled: !!reference,
    staleTime: Infinity,
    retry: false,
  })
}
