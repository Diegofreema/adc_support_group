import { Card, Progress } from '@/components/shared'
import { formatNairaShort } from '@/lib/format'
import type { CauseTotal } from '../types'

/** Money raised per cause against its target. */
export function CauseTotalsList({ causes }: { causes: CauseTotal[] }) {
  return (
    <div className="grid-2">
      {causes.map((cause) => (
        <Card key={cause.causeId}>
          <div className="row-between"><h3 className="h3">{cause.title}</h3><span className="small faint">{cause.payments} payments</span></div>
          <div className="mt-3"><Progress value={cause.raised} max={cause.target} label={cause.title} /></div>
          <div className="small mt-2"><b>{formatNairaShort(cause.raised)}</b> <span className="faint">of {formatNairaShort(cause.target)}</span></div>
        </Card>
      ))}
    </div>
  )
}
