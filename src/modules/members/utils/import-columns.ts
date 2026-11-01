import type { ColumnMapping, ImportField } from '../types'

export const IMPORT_FIELDS: { field: ImportField; label: string }[] = [
  { field: 'fullName', label: 'Full name' },
  { field: 'phone', label: 'Phone' },
  { field: 'state', label: 'State' },
  { field: 'lga', label: 'LGA' },
  { field: 'ward', label: 'Ward' },
]

/** Header words we recognise for each field. */
const ALIASES: Record<ImportField, string[]> = {
  fullName: ['name', 'full name', 'fullname'],
  phone: ['phone', 'phone no', 'phone number', 'mobile', 'gsm'],
  state: ['state'],
  lga: ['lga', 'local government'],
  ward: ['ward'],
}

function guessHeader(field: ImportField, headers: string[]): string {
  const aliases = ALIASES[field]
  return headers.find((header) => aliases.includes(header.trim().toLowerCase())) ?? ''
}

/** Pick the most likely column for each field. */
export function autoMatchColumns(headers: string[]): ColumnMapping {
  const entries = IMPORT_FIELDS.map(({ field }) => [field, guessHeader(field, headers)])
  return Object.fromEntries(entries) as ColumnMapping
}

export function templateCsv(): string {
  return `${IMPORT_FIELDS.map((item) => item.label).join(',')},Email\n`
}
