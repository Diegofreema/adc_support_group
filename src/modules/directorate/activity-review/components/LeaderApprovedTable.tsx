import { ClipboardCheck } from 'lucide-react'

import { Button, DataTable, EmptyState, type Column } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import type { ReviewActivity } from '../types'

function columns(onOverturn: (id: string) => void): Column<ReviewActivity>[] {
  return [
    { key: 'title', header: 'Activity', main: true, cell: (row) => <><div className="bold">{row.title}</div><div className="small faint">{formatDay(row.date)}</div></> },
    { key: 'group', header: 'Group', cell: (row) => row.groupName },
    { key: 'by', header: 'Approved by', cell: (row) => row.approvedBy ?? '' },
    { key: 'people', header: 'People', numeric: true, cell: (row) => formatNumber(row.peopleReached) },
    { key: 'overturn', header: '', numeric: true, cell: (row) => <Button size="sm" variant="danger" onClick={() => onOverturn(row.id)}>Overturn</Button> },
  ]
}

/** Activities a leader approved; the Directorate can overturn them. */
export function LeaderApprovedTable({ rows, onOverturn }: { rows: ReviewActivity[]; onOverturn: (id: string) => void }) {
  if (!rows.length) return <EmptyState icon={ClipboardCheck} title="Nothing here" />
  return <DataTable rows={rows} columns={columns(onOverturn)} rowKey={(row) => row.id} />
}
