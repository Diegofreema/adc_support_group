import type { SegmentOption } from '@/components/shared'
import type { DuesPeriod } from '../types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const STEP_MONTHS: Record<DuesPeriod, number> = { month: 1, quarter: 3, year: 12 }

export const PERIOD_OPTIONS: SegmentOption<DuesPeriod>[] = [
  { value: 'month', label: 'Monthly' },
  { value: 'quarter', label: 'Quarterly' },
  { value: 'year', label: 'Yearly' },
]

/** "a month", "every 3 months", "a year" — for "₦500 a month". */
export const PERIOD_WORDS: Record<DuesPeriod, string> = { month: 'a month', quarter: 'every 3 months', year: 'a year' }

const pad = (value: number) => String(value).padStart(2, '0')

function parts(iso: string): { year: number; month: number } {
  const [year, month] = iso.split('-').map(Number)
  return { year: year!, month: month! - 1 }
}

function toIso(year: number, month: number): string {
  const date = new Date(Date.UTC(year, month, 1))
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-01`
}

/** First day of the period holding this day (same rule as the backend). */
export function periodStart(iso: string, period: DuesPeriod): string {
  const { year, month } = parts(iso)
  if (period === 'year') return toIso(year, 0)
  if (period === 'quarter') return toIso(year, month - (month % 3))
  return toIso(year, month)
}

/** Move a period start `count` periods forward (or back, if negative). */
export function shiftPeriod(start: string, period: DuesPeriod, count: number): string {
  const { year, month } = parts(start)
  return toIso(year, month + STEP_MONTHS[period] * count)
}

/** "Nov 2026", "Q4 2026", "2026" (matches the backend's labels). */
export function periodLabel(start: string, period: DuesPeriod): string {
  const { year, month } = parts(start)
  if (period === 'year') return String(year)
  if (period === 'quarter') return `Q${Math.floor(month / 3) + 1} ${year}`
  return `${MONTHS[month]} ${year}`
}

/** "Nov 2026" or "Nov 2026 to Jan 2027". */
export function periodRange(from: string, period: DuesPeriod, count: number): string {
  const first = periodLabel(from, period)
  return count > 1 ? `${first} to ${periodLabel(shiftPeriod(from, period, count - 1), period)}` : first
}

/** Periods to choose from: up to 12 back (not before dues started) and 11 ahead. */
export function periodChoices(current: string, period: DuesPeriod, startOn?: string): { value: string; label: string }[] {
  const choices = []
  for (let step = -12; step <= 11; step += 1) {
    const value = shiftPeriod(current, period, step)
    if (startOn && value < startOn) continue
    choices.push({ value, label: periodLabel(value, period) })
  }
  return choices
}
