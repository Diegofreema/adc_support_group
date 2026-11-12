import { Link } from '@tanstack/react-router'
import { UserMinus } from 'lucide-react'

import { DataTable, EmptyState, ErrorState, FilterPills, SectionTitle, StatusChip, type Column, type PillOption } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { Pager } from '../../shared/components/Pager'
import { useDepartures } from '../hooks/use-departures'
import { departureChip } from '../utils/departure-status'
import type { Departure, DepartureFilter } from '../types'

const FILTERS: PillOption<DepartureFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'left', label: 'Left' },
  { value: 'deletion', label: 'Deletion requests' },
]

function GroupCell({ departure }: { departure: Departure }) {
  if (!departure.groupId || !departure.groupName) return <span className="faint">—</span>
  return <Link to="/admin/groups/$groupId" params={{ groupId: departure.groupId }} className="bold">{departure.groupName}</Link>
}

function DepartureChip({ departure }: { departure: Departure }) {
  const chip = departureChip(departure)
  return <StatusChip status={chip.status} label={chip.label} />
}

const COLUMNS: Column<Departure>[] = [
  { key: 'name', header: 'Name', main: true, cell: (row) => row.name },
  { key: 'group', header: 'Group', cell: (row) => <GroupCell departure={row} /> },
  { key: 'state', header: 'State', className: 'hide-mobile', cell: (row) => row.state ?? '—' },
  { key: 'status', header: 'Status', cell: (row) => <DepartureChip departure={row} /> },
  { key: 'date', header: 'Date', cell: (row) => formatDay(row.at) },
]

/** People who left a group or asked for their account to be deleted. */
export function DeparturesCard() {
  const log = useDepartures()
  return (
    <section className="mt-6">
      <SectionTitle title="Members who left" />
      <FilterPills label="Show" options={FILTERS} value={log.kind} onChange={log.setKind} />
      <div className="mt-4"><DeparturesBody log={log} /></div>
      <Pager paging={log.paging} total={log.total} />
    </section>
  )
}

function DeparturesBody({ log }: { log: ReturnType<typeof useDepartures> }) {
  if (log.error && !log.rows.length) return <ErrorState title="Could not load who left" error={log.error} onRetry={log.retry} />
  if (!log.rows.length) return log.isLoading ? null : <EmptyState icon={UserMinus} title="No one has left yet" />
  return <DataTable rows={log.rows} columns={COLUMNS} rowKey={(row) => row.key} />
}
