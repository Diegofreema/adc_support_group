import { ChevronRight } from 'lucide-react'
import type { KeyboardEvent, ReactNode } from 'react'

import { Card } from '../display/Card'
import { cn } from '@/lib/utils'

export interface Column<Row> {
  key: string
  header: string
  cell: (row: Row) => ReactNode
  /** Right-align numbers. */
  numeric?: boolean
  /** The main cell; shown as the card title on phones. */
  main?: boolean
  /** Extra classes on the header and cells, e.g. 'hide-mobile' for desktop-only columns. */
  className?: string
}

interface DataTableProps<Row> {
  rows: Row[]
  columns: Column<Row>[]
  rowKey: (row: Row) => string
  onRowClick?: (row: Row) => void
}

/** Register-style table that turns into stacked cards on phones. */
export function DataTable<Row>({ rows, columns, rowKey, onRowClick }: DataTableProps<Row>) {
  return (
    <Card flush>
      <table className="table table-cards">
        <thead>
          <tr>{columns.map((column) => <th key={column.key} className={cn(column.numeric && 't-right', column.className)}>{column.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <DataRow key={rowKey(row)} row={row} columns={columns} onClick={onRowClick} />
          ))}
        </tbody>
      </table>
    </Card>
  )
}

interface DataRowProps<Row> {
  row: Row
  columns: Column<Row>[]
  onClick?: (row: Row) => void
}

/** Opening a row works with Enter and Space, not just a tap. */
function openOnKey(open: () => void) {
  return (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    open()
  }
}

function DataRow<Row>({ row, columns, onClick }: DataRowProps<Row>) {
  const open = onClick && (() => onClick(row))
  return (
    <tr onClick={open} onKeyDown={open && openOnKey(open)} tabIndex={open ? 0 : undefined} role={open ? 'link' : undefined} className={cn(open && 'cursor-pointer')}>
      {columns.map((column) => (
        <td key={column.key} data-label={column.header} className={cn(column.numeric && 't-right', column.main && 't-main', column.className)}>
          {column.cell(row)}
        </td>
      ))}
      {open && <td className="row-chevron" aria-hidden><ChevronRight className="i" /></td>}
    </tr>
  )
}
