import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { readSheet } from '../services/import.service'
import type { ColumnMapping, ImportField, ParsedSheet } from '../types'
import { autoMatchColumns } from '../utils/import-columns'
import { checkRows, isMappingComplete } from '../utils/import-validation'
import { notify } from '@/lib/toast'

/** Reads the uploaded sheet and tracks which column feeds which field. */
export function useImportFile() {
  const [sheet, setSheet] = useState<ParsedSheet | null>(null)
  const [mapping, setMapping] = useState<ColumnMapping | null>(null)

  const read = useMutation({
    mutationFn: readSheet,
    onSuccess: (parsed) => {
      setSheet(parsed)
      setMapping(autoMatchColumns(parsed.headers))
    },
    onError: (error) => notify(error.message, 'error'),
  })

  const check = useMemo(() => (sheet && mapping ? checkRows(sheet.rows, mapping) : null), [sheet, mapping])
  const mapField = (field: ImportField, header: string) => setMapping((current) => current && { ...current, [field]: header })

  return {
    sheet, mapping, check, mapField,
    pickFile: (file: File) => read.mutate(file),
    isReading: read.isPending,
    canImport: Boolean(check?.ready && mapping && isMappingComplete(mapping)),
  }
}
