import { addMembers, refusalReason, summariseWelcome, type AddMembersResult, type AddMembersRow } from './members.service'
import type { ColumnMapping, ImportResult, ImportRowIssue, ParsedSheet } from '../types'
import { parseCsv } from '../utils/csv'
import { splitRows } from '../utils/import-validation'
import { normalisePhone } from '@/lib/phone'

/** The edge function takes at most 200 people per call. */
const BATCH = 200

function cellText(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).trim()
}

/** First sheet; first row is the headings. Loaded only when someone imports. */
async function readExcel(file: File): Promise<ParsedSheet> {
  const { readSheet: readXlsxSheet } = await import('read-excel-file/browser')
  const data = await readXlsxSheet(file)
  const [headingRow, ...body] = data
  const headers = (headingRow ?? []).map(cellText).filter(Boolean)
  if (!headers.length || !body.length) throw new Error('The file is empty')
  const rows = body
    .map((cells) => Object.fromEntries(headers.map((header, index) => [header, cellText(cells[index])])))
    .filter((row) => Object.values(row).some(Boolean))
  return { fileName: file.name, headers, rows }
}

async function readCsv(file: File): Promise<ParsedSheet> {
  const { headers, rows } = parseCsv(await file.text())
  if (!headers.length || !rows.length) throw new Error('The file is empty')
  return { fileName: file.name, headers, rows }
}

export async function readSheet(file: File): Promise<ParsedSheet> {
  return file.name.toLowerCase().endsWith('.csv') ? readCsv(file) : readExcel(file)
}

function toRow(row: Record<string, string>, mapping: ColumnMapping, chapterId?: string): AddMembersRow {
  return {
    fullName: row[mapping.fullName]!.trim(),
    phone: normalisePhone(row[mapping.phone]!),
    state: row[mapping.state],
    lga: row[mapping.lga],
    ward: row[mapping.ward],
    chapterId,
  }
}

/**
 * Add every valid row. People who already have an account are linked
 * (`linked`), everyone else gets a new account (`added`); refusals from the
 * server join the rows that failed the local checks.
 */
export async function importMembers(
  _groupId: string,
  sheet: ParsedSheet,
  mapping: ColumnMapping,
  chapter?: { id: string; name: string },
): Promise<ImportResult> {
  const { ready, issues } = splitRows(sheet.rows, mapping)
  const notAdded: ImportRowIssue[] = [...issues]
  let added = 0
  let linked = 0
  const calls: AddMembersResult[] = []

  for (let start = 0; start < ready.length; start += BATCH) {
    const batch = ready.slice(start, start + BATCH)
    const call = await addMembers(batch.map((row) => toRow(row, mapping, chapter?.id)), 'excel')
    calls.push(call)
    call.results.forEach((outcome, index) => {
      const row = batch[index]!
      if (outcome.result === 'added') {
        if (outcome.created) added += 1
        else linked += 1
        return
      }
      notAdded.push({
        row: sheet.rows.indexOf(row) + 2,
        name: row[mapping.fullName]?.trim() || 'No name',
        reason: refusalReason(outcome.result, outcome.error),
      })
    })
  }

  notAdded.sort((a, b) => a.row - b.row)
  return { added, linked, notAdded, welcome: summariseWelcome(calls) }
}
