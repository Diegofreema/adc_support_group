import { formatCompact } from '@/lib/format'
import { QUICK_AMOUNTS } from '../utils/amount'

interface QuickAmountsProps {
  value: number
  onPick: (amount: number) => void
}

export function QuickAmounts({ value, onPick }: QuickAmountsProps) {
  return (
    <div className="pills" role="group" aria-label="Quick amounts">
      {QUICK_AMOUNTS.map((amount) => (
        <button key={amount} type="button" className="pill" aria-pressed={value === amount} onClick={() => onPick(amount)}>
          {formatCompact(amount)}
        </button>
      ))}
    </div>
  )
}
