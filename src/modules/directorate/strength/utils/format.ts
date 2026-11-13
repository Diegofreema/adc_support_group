import { formatNumber } from '@/lib/format'

/** "2.4" members per 1,000 voters, or "—" with no voter count. */
export function formatPer1000(value: number | null): string {
  return value === null ? '—' : value.toFixed(value >= 10 ? 0 : 1)
}

/** "34%" of `total`, or "—" when there's nothing to divide. */
export function formatShare(part: number, total: number): string {
  return total > 0 ? `${Math.round((part / total) * 100)}%` : '—'
}

export { formatNumber }
