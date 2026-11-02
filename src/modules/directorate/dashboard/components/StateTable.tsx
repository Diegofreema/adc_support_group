import { DataTable, type Column } from '@/components/shared'
import { formatNairaShort, formatNumber } from '@/lib/format'
import type { StateRow } from '../types'

const COLUMNS: Column<StateRow>[] = [
  { key: 'state', header: 'State', main: true, cell: (row) => <span className="bold">{row.state}</span> },
  { key: 'groups', header: 'Groups', numeric: true, cell: (row) => formatNumber(row.groups) },
  { key: 'members', header: 'Members', numeric: true, cell: (row) => formatNumber(row.members) },
  { key: 'activities', header: 'Activities', numeric: true, cell: (row) => formatNumber(row.activities) },
  { key: 'raised', header: 'Raised', numeric: true, cell: (row) => formatNairaShort(row.raised) },
]

export function StateTable({ rows }: { rows: StateRow[] }) {
  return <DataTable rows={rows} columns={COLUMNS} rowKey={(row) => row.state} />
}
