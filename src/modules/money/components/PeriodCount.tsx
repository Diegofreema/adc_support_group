import { Minus, Plus } from 'lucide-react'

import { IconButton } from '@/components/shared'

interface PeriodCountProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

/** − 3 + : how many periods one payment covers. */
export function PeriodCount({ value, onChange, min = 1, max = 12 }: PeriodCountProps) {
  return (
    <div className="row gap-3">
      <IconButton icon={Minus} label="One less" disabled={value <= min} onClick={() => onChange(value - 1)} />
      <span className="h2 num min-w-8 text-center" aria-live="polite">{value}</span>
      <IconButton icon={Plus} label="One more" disabled={value >= max} onClick={() => onChange(value + 1)} />
    </div>
  )
}
