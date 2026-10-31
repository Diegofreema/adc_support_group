import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { createSupporter, fetchSupporters, type SupporterFilters } from './api'

export const supporterKeys = {
  all: ['supporters'] as const,
  list: (filters: SupporterFilters) => [...supporterKeys.all, 'list', filters] as const,
}

export const supportersQueryOptions = (filters: SupporterFilters) =>
  queryOptions({
    queryKey: supporterKeys.list(filters),
    queryFn: () => fetchSupporters(filters),
  })

export function useCreateSupporter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSupporter,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: supporterKeys.all }),
  })
}
