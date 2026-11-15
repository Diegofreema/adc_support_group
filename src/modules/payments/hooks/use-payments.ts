import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { useDebouncedValue } from '@/hooks/use-debounced-value'

import {
  getPayment, listActivityOptions, listChapters, listOpenCauses, listPayments, searchPayers,
} from '../services/payments.service'

export const paymentKeys = {
  all: ['payments'] as const,
  list: (groupId: string) => [...paymentKeys.all, 'list', groupId] as const,
  detail: (id: string) => [...paymentKeys.all, 'detail', id] as const,
  causes: () => [...paymentKeys.all, 'causes'] as const,
  chapters: () => [...paymentKeys.all, 'chapters'] as const,
  activities: () => [...paymentKeys.all, 'activity-options'] as const,
  payers: (query: string) => [...paymentKeys.all, 'payer-search', query] as const,
  giving: (amount: number, payerId?: string) => [...paymentKeys.all, 'giving', amount, payerId ?? 'me'] as const,
}

export function usePayments(groupId: string) {
  return useQuery(queryOptions({ queryKey: paymentKeys.list(groupId), queryFn: () => listPayments(groupId) }))
}

export function usePayment(id: string) {
  return useQuery(queryOptions({ queryKey: paymentKeys.detail(id), queryFn: () => getPayment(id) }))
}

export function useOpenCauses() {
  return useQuery(queryOptions({ queryKey: paymentKeys.causes(), queryFn: listOpenCauses }))
}

export function useChapterOptions() {
  return useQuery(queryOptions({ queryKey: paymentKeys.chapters(), queryFn: listChapters }))
}

export function useActivityOptions() {
  return useQuery(queryOptions({ queryKey: paymentKeys.activities(), queryFn: listActivityOptions }))
}

/** Leader only: the roster RPC refuses everyone else. */
/** Payer matches for what's typed; waits for a short pause in typing. */
export function usePayerSearch(query: string, enabled: boolean) {
  const settled = useDebouncedValue(query.trim().toLowerCase(), 250)
  return useQuery(queryOptions({
    queryKey: paymentKeys.payers(settled),
    queryFn: () => searchPayers(settled),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  }))
}
