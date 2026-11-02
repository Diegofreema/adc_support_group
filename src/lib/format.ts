/** Display formatting helpers. Pure functions, no React. */

const numberFormat = new Intl.NumberFormat('en-NG')

export function formatNumber(value: number): string {
  return numberFormat.format(value)
}

/** ₦250,000 */
export function formatNaira(value: number): string {
  return `₦${formatNumber(value)}`
}

/** ₦4.2m, ₦750k, ₦900 */
export function formatNairaShort(value: number): string {
  return `₦${formatCompact(value)}`
}

/** 1.18m, 750k, 900 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${trimDecimal(value / 1_000_000)}m`
  if (value >= 1_000) return `${trimDecimal(value / 1_000)}k`
  return String(value)
}

function trimDecimal(value: number): string {
  return value.toFixed(value >= 100 ? 0 : 1).replace(/\.0$/, '')
}

/** "Amaka Okafor" → "AO" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}

const dayFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
const dateTimeFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/** "31 Oct" */
export function formatDay(iso: string): string {
  return dayFormat.format(new Date(iso))
}

/** "31 Oct 2026, 10:42" */
export function formatDateTime(iso: string): string {
  return dateTimeFormat.format(new Date(iso))
}

/** Percent of target, clamped to 0–100. */
export function percentOf(value: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, Math.round((value / total) * 100))
}
