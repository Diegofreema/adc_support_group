import type { Tone } from '@/components/shared'

const TONE_CLASS: Record<Tone, string> = {
  green: 'chip-approved',
  amber: 'chip-pending',
  blue: 'chip-info',
  red: 'chip-rejected',
  grey: 'chip-neutral',
}

/** A count stamp in a status colour (e.g. "18" waiting). */
export function CountChip({ count, tone }: { count: number; tone: Tone }) {
  return <span className={`chip ${TONE_CLASS[tone]}`}>{count}</span>
}
