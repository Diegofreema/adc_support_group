import { DataTable, StatusChip, type Column } from '@/components/shared'
import { formatNaira } from '@/lib/format'
import { methodLabel, purposeLabel } from '../utils/labels'
import type { Payment } from '@/types/domain'

const COLUMNS: Column<Payment>[] = [
  { key: 'group', header: 'Group', main: true, cell: (payment) => <><div className="bold">{payment.groupName}</div>{payment.chapterName && <div className="small faint">{payment.chapterName} chapter</div>}</> },
  { key: 'for', header: 'For', cell: purposeLabel },
  { key: 'method', header: 'Method', cell: (payment) => methodLabel(payment.method) },
  { key: 'amount', header: 'Amount', numeric: true, cell: (payment) => formatNaira(payment.amount) },
  { key: 'status', header: 'Status', cell: (payment) => <StatusChip status={payment.status} /> },
]

export function PaymentsTable({ payments }: { payments: Payment[] }) {
  return <DataTable rows={payments} columns={COLUMNS} rowKey={(payment) => payment.id} />
}
