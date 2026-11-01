import { useState } from 'react'

import { useChapterOptions } from './use-members'
import { useImportFile } from './use-import-file'
import { useImportSubmit } from './use-import-submit'
import type { ImportResult } from '../types'
import { downloadText } from '../utils/download'
import { toCsv } from '../utils/csv'
import { templateCsv } from '../utils/import-columns'
import { useWizard } from '@/hooks/use-wizard'

/** Upload → check → done, for bulk member uploads. */
export function useImportWizard(groupId: string) {
  const wizard = useWizard(3)
  const file = useImportFile()
  const chapters = useChapterOptions(groupId)
  const [chapterId, setChapterId] = useState('')
  const [result, setResult] = useState<ImportResult | null>(null)
  const submit = useImportSubmit(groupId, (done) => {
    setResult(done)
    wizard.next()
  })

  const runImport = () => {
    if (!file.sheet || !file.mapping) return
    const chapter = chapters.data?.find((item) => item.id === chapterId)
    submit.mutate({ sheet: file.sheet, mapping: file.mapping, chapter })
  }

  return {
    wizard, file, result, chapterId, setChapterId,
    chapters: chapters.data ?? [],
    runImport, isImporting: submit.isPending,
    downloadTemplate: () => downloadText('members-template.csv', templateCsv()),
    downloadIssues: () => result && downloadText('not-added.csv', toCsv(['Row', 'Name', 'Reason'], result.notAdded.map((issue) => [issue.row, issue.name, issue.reason]))),
  }
}
