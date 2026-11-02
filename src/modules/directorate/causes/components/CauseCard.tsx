import { Link } from '@tanstack/react-router'

import { Button, Card, Progress, StatusChip, buttonClassName } from '@/components/shared'
import { formatNairaShort } from '@/lib/format'
import { deadlineLabel } from '../utils/cause-list'
import type { Cause } from '@/types/domain'

export function CauseCard({ cause, onEdit }: { cause: Cause; onEdit: (cause: Cause) => void }) {
  return (
    <Card>
      <div className="row-between"><StatusChip status={cause.status} /><span className="small faint">{deadlineLabel(cause)}</span></div>
      <h3 className="h3 mt-3">{cause.title}</h3>
      <div className="mt-3"><Progress value={cause.raised} max={cause.target} label={cause.title} /></div>
      <div className="row-between small mt-2">
        <span><b>{formatNairaShort(cause.raised)}</b> <span className="faint">of {formatNairaShort(cause.target)}</span></span>
        <span className="faint">{cause.groupsCount} groups</span>
      </div>
      <div className="grid-2 mt-4 !grid-cols-2">
        <Link to="/admin/payments" className={buttonClassName('secondary', 'sm')}>Payments</Link>
        <Button size="sm" onClick={() => onEdit(cause)}>Edit</Button>
      </div>
    </Card>
  )
}
