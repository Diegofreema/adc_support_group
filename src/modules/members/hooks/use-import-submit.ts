import { useMutation, useQueryClient } from '@tanstack/react-query'

import { memberKeys } from './query-keys'
import { importMembers } from '../services/import.service'
import type { ChapterOption, ColumnMapping, ImportResult, ParsedSheet } from '../types'
import { notify } from '@/lib/toast'

interface ImportInput {
  sheet: ParsedSheet
  mapping: ColumnMapping
  chapter?: ChapterOption
}

export function useImportSubmit(groupId: string, onDone: (result: ImportResult) => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ sheet, mapping, chapter }: ImportInput) => importMembers(groupId, sheet, mapping, chapter),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: memberKeys.all })
      onDone(result)
    },
    onError: (error) => notify(error.message, 'error'),
  })
}
