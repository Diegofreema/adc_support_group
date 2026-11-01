import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface StatItem {
  label: string
  value: ReactNode
  sub?: ReactNode
  icon?: LucideIcon
}

interface StatGridProps {
  stats: StatItem[]
  /** Force a column count (defaults: 2 on phones, 4 on desktop). */
  columns?: 2 | 3 | 4
}

const COLUMNS: Record<2 | 3 | 4, string> = {
  2: '!grid-cols-2',
  3: '!grid-cols-3',
  4: '!grid-cols-2 lg:!grid-cols-4',
}

/** Ledger row of numbers sharing hairline rules. */
export function StatGrid({ stats, columns }: StatGridProps) {
  return (
    <div className={cn('stats', columns && COLUMNS[columns])}>
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </div>
  )
}

export function Stat({ label, value, sub, icon: Icon }: StatItem) {
  return (
    <div className="stat">
      <div className="stat-label">
        {Icon && <Icon className="i" aria-hidden />}
        {label}
      </div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  )
}
