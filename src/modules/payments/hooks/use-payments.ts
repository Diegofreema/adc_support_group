import { queryOptions, useQuery } from '@tanstack/react-query'

import { getPayment, listActivityOptions, listChapters, listOpenCauses, listPayments } from '../services/payments.service'

export const paymentKeys = {
  all: ['payments'] as const,
  list: (groupId: string) => [...paymentKeys.all, 'list', groupId] as const,
  detail: (id: string) => [...paymentKeys.all, 'detail', id] as const,
  causes: () => [...paymentKeys.all, 'causes'] as const,
  chapters: () => [...paymentKeys.all, 'chapters'] as const,
  activities: () => [...paymentKeys.all, 'activity-options'] as const,
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
