import type { DuesFilter, EntryTab } from '../types'

/** Query keys; everything sits under `all`, so one invalidation refreshes every money screen. */
export const moneyKeys = {
  all: ['money'] as const,
  summary: () => [...moneyKeys.all, 'summary'] as const,
  entries: (tab: EntryTab) => [...moneyKeys.all, 'entries', tab] as const,
  duesStatus: (period: string, filter: DuesFilter, search: string) => [...moneyKeys.all, 'dues-status', period, filter, search] as const,
  members: (search: string) => [...moneyKeys.all, 'members', search] as const,
  proof: (path: string) => [...moneyKeys.all, 'proof', path] as const,
}
