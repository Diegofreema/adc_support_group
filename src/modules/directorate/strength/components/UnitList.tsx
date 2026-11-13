import { MapPinned } from 'lucide-react'

import { Card, CardHead, EmptyState } from '@/components/shared'
import type { StrengthUnit } from '../types'
import { formatNumber, formatPer1000 } from '../utils/format'

interface Props {
  title: string
  units: StrengthUnit[]
  empty: string
  /** Strongest shows members per 1,000 voters; weakest shows registered voters (the size of the gap). */
  measure: 'per1000' | 'voters'
}

/** A ranked list of polling units with where they are and their numbers. */
export function UnitList({ title, units, empty, measure }: Props) {
  return (
    <Card flush>
      <div className="px-4 pt-4"><CardHead title={title} /></div>
      {units.length === 0 ? <div className="p-4"><EmptyState icon={MapPinned} title={empty} /></div> : (
        <ol>
          {units.map((unit) => (
            <li key={unit.code} className="list-item">
              <div className="min-w-0 flex-1">
                <p className="title truncate">{unit.name}</p>
                <p className="meta truncate">{unit.code} · {unit.ward}, {unit.lga}</p>
              </div>
              <div className="t-right">
                <p className="title">{formatNumber(unit.members)}</p>
                <p className="meta">{measure === 'per1000' ? `${formatPer1000(unit.per1000)} per 1,000` : `${formatNumber(unit.voters)} voters`}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
