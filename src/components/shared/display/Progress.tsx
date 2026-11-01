import { percentOf } from '@/lib/format'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  small?: boolean
  label?: string
}

/** Ruled progress bar with 10% ticks. */
export function Progress({ value, max = 100, small, label }: ProgressProps) {
  const percent = percentOf(value, max)
  return (
    <div className={cn('progress', small && 'progress-sm')} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${percent}%` }} />
    </div>
  )
}
