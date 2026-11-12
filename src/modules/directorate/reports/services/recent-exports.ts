import type { ExportRecord } from '../types'

/** Recent exports are a per-browser convenience; storage can be missing or blocked. */
const KEY = 'adc-directorate-exports'
const KEEP = 10

export function readRecentExports(): ExportRecord[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(parsed) ? (parsed as ExportRecord[]) : []
  } catch {
    return []
  }
}

export function rememberExport(record: ExportRecord): void {
  try {
    localStorage.setItem(KEY, JSON.stringify([record, ...readRecentExports()].slice(0, KEEP)))
  } catch {
    // storage blocked: the export still downloaded
  }
}
