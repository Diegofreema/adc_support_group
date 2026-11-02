import type { ColumnMapping, ImportCheck, ImportRowIssue } from '../types'
import { isValidPhone, normalisePhone } from '@/lib/phone'

type Row = Record<string, string>

function cell(row: Row, mapping: ColumnMapping, field: keyof ColumnMapping): string {
  return (row[mapping[field]] ?? '').trim()
}

/** First problem with a row, or null if it can be imported. */
export function rowProblem(row: Row, mapping: ColumnMapping, seenPhones: Set<string>): string | null {
  if (!cell(row, mapping, 'fullName')) return 'Name missing'
  const phone = cell(row, mapping, 'phone')
  if (!isValidPhone(phone)) return 'Phone too short'
  if (seenPhones.has(normalisePhone(phone))) return 'Phone repeated'
  if (!cell(row, mapping, 'ward')) return 'Ward missing'
  return null
}

export interface SplitRows {
  ready: Row[]
  issues: ImportRowIssue[]
}

/** Separate importable rows from problem rows (row numbers count the header as row 1). */
export function splitRows(rows: Row[], mapping: ColumnMapping): SplitRows {
  const seen = new Set<string>()
  const result: SplitRows = { ready: [], issues: [] }
  rows.forEach((row, index) => {
    const problem = rowProblem(row, mapping, seen)
    if (problem) result.issues.push({ row: index + 2, name: cell(row, mapping, 'fullName') || 'No name', reason: problem })
    else {
      seen.add(normalisePhone(cell(row, mapping, 'phone')))
      result.ready.push(row)
    }
  })
  return result
}

export function checkRows(rows: Row[], mapping: ColumnMapping): ImportCheck {
  const { ready, issues } = splitRows(rows, mapping)
  return { total: rows.length, ready: ready.length, issues }
}

export function isMappingComplete(mapping: ColumnMapping): boolean {
  return Object.values(mapping).every(Boolean)
}
