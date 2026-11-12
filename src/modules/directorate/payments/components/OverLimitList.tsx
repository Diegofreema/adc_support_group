import { Link } from '@tanstack/react-router'
import { HandCoins } from 'lucide-react'

import { DataTable, EmptyState, StatusChip, type Column } from '@/components/shared'
import { formatDay, formatNaira } from '@/lib/format'
import type { OverLimitPayment } from '../types'

const COLUMNS: Column<OverLimitPayment>[] = [
  { key: 'payer', header: 'Payer', main: true, cell: (row) => <span className="bold">{row.payerName}</span> },
  { key: 'group', header: 'Group', cell: (row) => <Link to="/admin/groups/$groupId" params={{ groupId: row.groupId }} className="bold">{row.groupName}</Link> },
  { key: 'amount', header: 'Amount', numeric: true, cell: (row) => formatNaira(row.amount) },
  { key: 'before', header: 'Given before', numeric: true, cell: (row) => formatNaira(row.givenBefore) },
  { key: 'status', header: 'Status', cell: (row) => <StatusChip status={row.status} /> },
  { key: 'date', header: 'Date', cell: (row) => formatDay(row.date) },
]

/** Payments that took the payer past the yearly giving limit. Shown to staff; never blocked. */
export function OverLimitList({ payments, limit }: { payments: OverLimitPayment[]; limit: number | null }) {
  const note = limit === null ? 'No giving limit is set now.' : `The yearly giving limit is ${formatNaira(limit)} a person.`
  return (
    <>
      <p className="faint small mb-3">{note} Given before is what they had paid that year before this payment.</p>
      {payments.length ? <DataTable rows={payments} columns={COLUMNS} rowKey={(row) => row.id} /> : <EmptyState icon={HandCoins} title="No payments over the limit" />}
    </>
  )
}
