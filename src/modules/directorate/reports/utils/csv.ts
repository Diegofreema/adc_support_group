import type { ExportTable } from '../types'

function cell(value: string | number | null | undefined): string {
  const text = value === null || value === undefined ? '' : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** RFC 4180 CSV with a UTF-8 BOM so Excel opens it with the right characters. */
export function toCsv(table: ExportTable): string {
  const lines = [table.headers, ...table.rows].map((row) => row.map(cell).join(','))
  return `﻿${lines.join('\r\n')}\r\n`
}

/** "groups-kano-2026-11-12.csv" */
export function csvFileName(label: string, now: Date = new Date()): string {
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${slug || 'export'}-${now.toISOString().slice(0, 10)}.csv`
}
