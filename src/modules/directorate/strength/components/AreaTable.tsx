import { DataTable, type Column } from '@/components/shared'
import { inecToDisplayName } from '@/lib/geo/nigeria-map-3d'
import type { StrengthArea, StrengthLevel } from '../types'
import { formatNumber, formatPer1000 } from '../utils/format'

const HEADER: Record<StrengthLevel, string> = { state: 'State', lga: 'LGA', ward: 'Ward', unit: 'Polling unit' }

function areaLabel(level: StrengthLevel, row: StrengthArea): string {
  if (level === 'state') return inecToDisplayName(row.area)
  if (level === 'unit') return `${row.name ?? ''} (${row.area})`
  return row.area
}

/** One row per state, LGA, ward or unit; opening a row goes one level down. */
export function AreaTable({ level, rows, onOpen }: { level: StrengthLevel; rows: StrengthArea[]; onOpen: (row: StrengthArea) => void }) {
  const columns: Column<StrengthArea>[] = [
    { key: 'area', header: HEADER[level], main: true, cell: (row) => <span className="bold">{areaLabel(level, row)}</span> },
    { key: 'members', header: 'Members', numeric: true, cell: (row) => formatNumber(row.members) },
    { key: 'voters', header: 'Voters', numeric: true, cell: (row) => formatNumber(row.voters) },
    { key: 'per1000', header: 'Per 1,000', numeric: true, cell: (row) => formatPer1000(row.per1000) },
  ]
  if (level !== 'unit') {
    columns.push({ key: 'empty', header: 'Units with none', numeric: true, className: 'hide-mobile', cell: (row) => `${formatNumber(row.unitsEmpty)} of ${formatNumber(row.units)}` })
  }
  return <DataTable rows={rows} columns={columns} rowKey={(row) => row.area} onRowClick={level === 'unit' ? undefined : onOpen} />
}
