const DAYS: Record<string, number> = { week: 7, month: 30 }

/** Start of a period, matching the backend ('week' = 7 days, 'month' = 30 days); null for all time. */
export function periodStart(period: string, now: Date = new Date()): Date | null {
  const days = DAYS[period]
  return days ? new Date(now.getTime() - days * 86_400_000) : null
}

/** YYYY-MM-DD for date RPC arguments. */
export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10)
}
