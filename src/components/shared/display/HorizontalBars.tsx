import { formatNumber } from '@/lib/format'
import { Progress } from './Progress'

export interface BarItem {
  label: string
  value: number
}

/** Labelled bars scaled to the largest value. */
export function HorizontalBars({ items }: { items: BarItem[] }) {
  const max = Math.max(...items.map((item) => item.value), 1)
  return (
    <div className="hbars">
      {items.map((item) => (
        <div key={item.label}>
          <div className="hbar-top"><b>{item.label}</b><span>{formatNumber(item.value)}</span></div>
          <Progress value={item.value} max={max} small label={item.label} />
        </div>
      ))}
    </div>
  )
}
