import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { createExport, recentExportsQuery } from '../services/reports.service'
import { ALL } from '../../shared/constants/options'
import { directorateKeys } from '../../shared/query-keys'
import type { ExportSpec } from '../types'
import { notify } from '@/lib/toast'

export const useRecentExports = () => useQuery(recentExportsQuery).data ?? []

/** Export choices + "Download". */
export function useExportBuilder() {
  const [spec, setSpec] = useState<ExportSpec>({ subject: 'groups', state: ALL, category: ALL, period: 'all', format: 'excel' })
  const queryClient = useQueryClient()
  const download = useMutation({
    mutationFn: createExport,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: directorateKeys.exports() }); notify('File ready') },
  })
  const update = <K extends keyof ExportSpec>(key: K) => (value: ExportSpec[K]) => setSpec((current) => ({ ...current, [key]: value }))
  return { spec, update, download: () => download.mutate(spec), preparing: download.isPending }
}

export type ExportBuilder = ReturnType<typeof useExportBuilder>
