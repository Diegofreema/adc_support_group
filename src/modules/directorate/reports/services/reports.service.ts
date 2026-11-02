import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import { exportLabel } from '../utils/export-label'
import type { ExportRecord, ExportSpec } from '../types'
import { newId, respond } from '@/lib/mock-api'

const recent: ExportRecord[] = [
  { id: 'exp_1', label: 'Groups · Kano', format: 'excel', createdAt: '2026-11-01T09:00:00Z' },
  { id: 'exp_2', label: 'Payments · All · This month', format: 'csv', createdAt: '2026-10-27T12:00:00Z' },
  { id: 'exp_3', label: 'Activities · All', format: 'excel', createdAt: '2026-10-28T08:00:00Z' },
]

export const recentExportsQuery = queryOptions({ queryKey: directorateKeys.exports(), queryFn: () => respond(recent) })

/** Mock: the real backend builds the file and returns a download link. */
export async function createExport(spec: ExportSpec): Promise<ExportRecord> {
  const record: ExportRecord = { id: newId('exp'), label: exportLabel(spec), format: spec.format, createdAt: new Date().toISOString() }
  recent.unshift(record)
  return respond(record, 800)
}
