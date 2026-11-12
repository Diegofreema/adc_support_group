import { Link } from '@tanstack/react-router'

import { Button, Card, Progress, StatusChip, buttonClassName } from '@/components/shared'
import { formatNairaShort, countLabel } from '@/lib/format'
import { deadlineLabel } from '../utils/cause-list'
import type { DirectorateCause } from '../types'
import type { CauseStatus } from '@/types/domain'

interface CauseCardProps {
  cause: DirectorateCause
  onEdit: (cause: DirectorateCause) => void
  onToggleStatus: (next: CauseStatus) => void
}

export function CauseCard({ cause, onEdit, onToggleStatus }: CauseCardProps) {
  const isOpen = cause.status === 'open'
  return (
    <Card>
      <div className="row-between"><StatusChip status={cause.status} /><span className="small faint">{deadlineLabel(cause)}</span></div>
      <h3 className="h3 mt-3">{cause.title}</h3>
      <div className="small faint mt-1">{cause.visibleTo}</div>
      <div className="mt-3"><Progress value={cause.raised} max={cause.target} label={cause.title} /></div>
      <div className="row-between small mt-2">
        <span><b>{formatNairaShort(cause.raised)}</b> <span className="faint">of {formatNairaShort(cause.target)}</span></span>
        <span className="faint">{countLabel(cause.groupsCount, 'group', 'groups')}</span>
      </div>
      <div className="grid-3 mt-4 !grid-cols-3">
        <Link to="/admin/payments" className={buttonClassName('secondary', 'sm')}>Payments</Link>
        <Button size="sm" onClick={() => onEdit(cause)}>Edit</Button>
        <Button size="sm" variant={isOpen ? 'danger' : 'secondary'} onClick={() => onToggleStatus(isOpen ? 'closed' : 'open')}>{isOpen ? 'Close' : 'Reopen'}</Button>
      </div>
    </Card>
  )
}
