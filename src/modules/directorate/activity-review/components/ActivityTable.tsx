import { ClipboardCheck } from 'lucide-react'

import { Button, DataTable, EmptyState, type Column } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import type { ReviewActivity } from '../types'

type ActivityColumn = Column<ReviewActivity>

const title: ActivityColumn = { key: 'title', header: 'Activity', main: true, cell: (row) => <><div className="bold">{row.title}</div><div className="small faint">{formatDay(row.date)}</div></> }
const group: ActivityColumn = { key: 'group', header: 'Group', cell: (row) => row.groupName }
const approvedBy: ActivityColumn = { key: 'by', header: 'Approved by', cell: (row) => row.approvedBy ?? '' }
const people: ActivityColumn = { key: 'people', header: 'People', numeric: true, cell: (row) => formatNumber(row.peopleReached) }
const reason: ActivityColumn = { key: 'reason', header: 'Reason', cell: (row) => row.rejectionReason ?? '' }

function columns(onOverturn?: (id: string) => void): ActivityColumn[] {
  if (!onOverturn) return [title, group, people, reason]
  const overturn: ActivityColumn = { key: 'overturn', header: '', numeric: true, cell: (row) => <Button size="sm" variant="danger" className="!min-h-11" onClick={() => onOverturn(row.id)}>Overturn</Button> }
  return [title, group, approvedBy, people, overturn]
}

/** Checked activities (the Directorate can overturn them) or rejected ones (with the reason). */
export function ActivityTable({ rows, onOverturn }: { rows: ReviewActivity[]; onOverturn?: (id: string) => void }) {
  if (!rows.length) return <EmptyState icon={ClipboardCheck} title={onOverturn ? 'No checked activities' : 'No rejected activities'} />
  return <DataTable rows={rows} columns={columns(onOverturn)} rowKey={(row) => row.id} />
}
