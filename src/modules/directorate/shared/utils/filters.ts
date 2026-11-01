import { ALL } from '../constants/options'

/** Case-insensitive "contains" across several fields. Empty query matches everything. */
export function matchesSearch(query: string, ...fields: (string | undefined)[]): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return fields.some((field) => field?.toLowerCase().includes(needle))
}

/** Exact match unless the filter is "All". */
export function matchesOption(filter: string, value: string | undefined): boolean {
  return filter === ALL || filter === value
}

/** "12 days", "Today", "1 day" since an ISO date. */
export function daysAgoLabel(iso: string, now: Date = new Date()): string {
  const days = Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000)
  if (days <= 0) return 'Today'
  return days === 1 ? '1 day' : `${days} days`
}
