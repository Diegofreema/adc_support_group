import { membersDb } from './members.mock'
import type { ColumnMapping, ImportResult, MemberRecord, ParsedSheet } from '../types'
import { parseCsv } from '../utils/csv'
import { splitRows } from '../utils/import-validation'
import { normalisePhone } from '@/lib/phone'
import { delay, newId, respond } from '@/lib/mock-api'

/** Stand-in rows for .xlsx files until an Excel parser is added. */
const DEMO_SHEET_ROWS: Record<string, string>[] = [
  { Name: 'Chioma Nwosu', 'Phone No': '08062214590', State: 'Lagos', LGA: 'Surulere', Ward: 'Surulere 4' },
  { Name: 'Bisi Adeyemi', 'Phone No': '08025519087', State: 'Lagos', LGA: 'Ikeja', Ward: 'Ikeja' },
  { Name: 'Kemi Ojo', 'Phone No': '0803 12', State: 'Lagos', LGA: 'Yaba', Ward: 'Yaba' },
  { Name: 'Ade Lawal', 'Phone No': '08077665544', State: 'Lagos', LGA: 'Surulere', Ward: '' },
  { Name: 'Yemi Bakare', 'Phone No': '08121234567', State: 'Lagos', LGA: 'Ikeja', Ward: 'Alausa' },
  { Name: 'Grace Udo', 'Phone No': '08121234567', State: 'FCT', LGA: 'Bwari', Ward: 'Bwari' },
]

async function readExcel(file: File): Promise<ParsedSheet> {
  // TODO: parse .xlsx with `xlsx`/`exceljs` (as Rise Up does). Demo rows for now.
  await delay(400)
  return { fileName: file.name, headers: Object.keys(DEMO_SHEET_ROWS[0]!), rows: DEMO_SHEET_ROWS }
}

async function readCsv(file: File): Promise<ParsedSheet> {
  const { headers, rows } = parseCsv(await file.text())
  if (!headers.length || !rows.length) throw new Error('The file is empty')
  return { fileName: file.name, headers, rows }
}

export async function readSheet(file: File): Promise<ParsedSheet> {
  return file.name.toLowerCase().endsWith('.csv') ? readCsv(file) : readExcel(file)
}

function toMember(row: Record<string, string>, mapping: ColumnMapping, groupId: string, chapter?: { id: string; name: string }): MemberRecord {
  return {
    id: newId('mem'), groupId, fullName: row[mapping.fullName]!.trim(), phone: normalisePhone(row[mapping.phone]!),
    state: row[mapping.state], lga: row[mapping.lga], ward: row[mapping.ward], chapterId: chapter?.id, chapterName: chapter?.name,
    role: 'member', joinedVia: 'excel', activityCount: 0, joinedAt: new Date().toISOString(),
  }
}

function hasAccount(phone: string): boolean {
  return membersDb.some((member) => member.phone === normalisePhone(phone))
}

/** Add every valid row; existing phone numbers are linked instead of duplicated. */
export async function importMembers(groupId: string, sheet: ParsedSheet, mapping: ColumnMapping, chapter?: { id: string; name: string }): Promise<ImportResult> {
  const { ready, issues } = splitRows(sheet.rows, mapping)
  const linked = ready.filter((row) => hasAccount(row[mapping.phone]!))
  const fresh = ready.filter((row) => !hasAccount(row[mapping.phone]!)).map((row) => toMember(row, mapping, groupId, chapter))
  membersDb.unshift(...fresh)
  return respond({ added: fresh.length, linked: linked.length, notAdded: issues }, 700)
}
