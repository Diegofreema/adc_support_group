import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { createExport, recentExportsQuery, reportTotalsQuery } from '../services/reports.service'
import { ALL } from '../../shared/constants/options'
import { useCategories, useCategoryOptions } from '../../shared/hooks/use-lookups'
import { directorateKeys } from '../../shared/query-keys'
import { exportLabel } from '../utils/export-label'
import type { ExportRecord, ExportSpec } from '../types'
import { formatNumber } from '@/lib/format'
import { notify } from '@/lib/toast'

export const useRecentExports = () => useQuery(recentExportsQuery).data ?? []

export const useReportTotals = (period: string) => useQuery(reportTotalsQuery(period)).data

function useDownload() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ spec, label }: { spec: ExportSpec; label: string }) => createExport(spec, label),
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: directorateKeys.exports() })
      notify(`Downloaded ${formatNumber(record.rows)} rows`)
    },
  })
}

/** Export choices + "Download". */
export function useExportBuilder() {
  const [spec, setSpec] = useState<ExportSpec>({ subject: 'groups', state: ALL, category: ALL, period: 'all' })
  const categories = useCategories()
  const categoryOptions = useCategoryOptions()
  const download = useDownload()
  const update = <K extends keyof ExportSpec>(key: K) => (value: ExportSpec[K]) => setSpec((current) => ({ ...current, [key]: value }))
  const label = exportLabel(spec, categories.find((category) => category.id === spec.category)?.name)
  return { spec, update, categoryOptions, download: () => download.mutate({ spec, label }), preparing: download.isPending }
}

/** Download a recent export again (fresh data, same choices). */
export function useRedownload() {
  const download = useDownload()
  return { redownload: (record: ExportRecord) => download.mutate({ spec: record.spec, label: record.label }), preparing: download.isPending }
}

export type ExportBuilder = ReturnType<typeof useExportBuilder>
