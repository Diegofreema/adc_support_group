import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import { isoDay, periodStart } from '../../shared/utils/period'
import { csvFileName, toCsv } from '../utils/csv'
import { downloadText } from '../utils/download'
import { buildExportTable } from './export-tables'
import { readRecentExports, rememberExport } from './recent-exports'
import type { ExportRecord, ExportSpec, ReportTotals } from '../types'
import { rpc } from '@/lib/supabase'

type Num = number | string

interface ReportsJson {
  totals: { groups: Num; members: Num; activities: Num; people_reached: Num; amount_paid: Num }
}

/** Headline numbers for a period (get_admin_sg_reports; state admins see their state). */
async function fetchReportTotals(period: string): Promise<ReportTotals> {
  const start = periodStart(period)
  const { totals } = await rpc<ReportsJson>('get_admin_sg_reports', { p_from: start ? isoDay(start) : null, p_to: null })
  return {
    groups: Number(totals.groups),
    members: Number(totals.members),
    activities: Number(totals.activities),
    peopleReached: Number(totals.people_reached),
    amountPaid: Number(totals.amount_paid),
  }
}

export const reportTotalsQuery = (period: string) =>
  queryOptions({ queryKey: directorateKeys.reports(period), queryFn: () => fetchReportTotals(period) })

export const recentExportsQuery = queryOptions({ queryKey: directorateKeys.exports(), queryFn: async () => readRecentExports(), staleTime: 0 })

/** Build the CSV in the browser, download it, and remember it in "Recent". */
export async function createExport(spec: ExportSpec, label: string): Promise<ExportRecord> {
  const table = await buildExportTable(spec)
  downloadText(csvFileName(label), toCsv(table))
  const record: ExportRecord = { id: crypto.randomUUID(), label, spec, rows: table.rows.length, createdAt: new Date().toISOString() }
  rememberExport(record)
  return record
}
