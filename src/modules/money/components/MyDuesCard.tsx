import { CalendarCheck } from 'lucide-react'

import { Card, CardHead, StatusChip, Tag } from '@/components/shared'
import { formatNaira } from '@/lib/format'
import type { DuesInfo } from '../types'
import { PERIOD_WORDS } from '../utils/periods'

/** My dues: how much, and whether I've paid for now. */
export function MyDuesCard({ dues, recordsDues }: { dues: DuesInfo; recordsDues: boolean }) {
  return (
    <Card className="mt-4">
      <CardHead title="My dues" />
      {dues.enabled && dues.amount && dues.period ? <DuesOn dues={dues} amount={dues.amount} period={PERIOD_WORDS[dues.period]} recordsDues={recordsDues} /> : <p className="muted">Dues are off.</p>}
    </Card>
  )
}

function DuesOn({ dues, amount, period, recordsDues }: { dues: DuesInfo; amount: number; period: string; recordsDues: boolean }) {
  const label = dues.currentLabel ?? ''
  const earlier = dues.myPaid.filter((paid) => paid.start !== dues.currentPeriod).slice(0, 6)
  return (
    <>
      <p className="bold">Dues: {formatNaira(amount)} {period}</p>
      <div className="mt-2">
        {dues.iPaidCurrent ? <StatusChip status="paid" label={`Paid for ${label}`} /> : <StatusChip status="pending" label={`Not paid for ${label} yet`} />}
      </div>
      {!dues.iPaidCurrent && !recordsDues && <p className="small muted mt-2">Pay your leader or treasurer. They record it here.</p>}
      {earlier.length > 0 && (
        <div className="mt-3">
          <div className="small faint">Paid before</div>
          <div className="row wrap gap-2 mt-1">{earlier.map((paid) => <Tag key={paid.start} icon={CalendarCheck}>{paid.label}</Tag>)}</div>
        </div>
      )}
    </>
  )
}
