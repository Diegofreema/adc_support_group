import { useQuery } from '@tanstack/react-query'

import { moneySummaryQuery } from '../services/money.service'

/** The group purse and my dues. */
export function useMoneySummary() {
  const query = useQuery(moneySummaryQuery)
  return { summary: query.data, error: query.data ? null : query.error, retry: () => void query.refetch() }
}
