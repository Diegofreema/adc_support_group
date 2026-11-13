/** Minimal CSV handling for member uploads (no quoted commas inside cells). */
import { neutraliseFormula } from '@/lib/csv-safe'

function splitLine(line: string): string[] {
  return line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''))
}

function toRow(headers: string[], cells: string[]): Record<string, string> {
  return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']))
}

export function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter((line) => line.trim())
  const headers = splitLine(lines[0] ?? '')
  const rows = lines.slice(1).map((line) => toRow(headers, splitLine(line)))
  return { headers, rows }
}

function escapeCell(value: string | number): string {
  const text = typeof value === 'string' ? neutraliseFormula(value) : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(headers: string[], rows: (string | number)[][]): string {
  return [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n')
}
