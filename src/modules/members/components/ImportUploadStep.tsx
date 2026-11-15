import { Dropzone, WizardActions } from '@/components/shared'
import type { ChapterOption } from '../types'
import { ChapterSelect } from './ChapterSelect'
import { NeededColumns } from './NeededColumns'

interface ImportUploadStepProps {
  fileName?: string
  isReading: boolean
  chapters: ChapterOption[]
  chapterId: string
  onChapterChange: (chapterId: string) => void
  onFile: (file: File) => void
  onTemplate: () => void
  onNext: () => void
}

export function ImportUploadStep({ fileName, isReading, chapters, chapterId, onChapterChange, onFile, onTemplate, onNext }: ImportUploadStepProps) {
  return (
    <section className="mt-6">
      <h1 className="h1">Upload your list</h1>
      <p className="muted mt-1">An Excel or CSV file with names and phone numbers.</p>
      <div className="mt-5"><Dropzone label="Choose your file" hint="Excel (.xlsx) or CSV" accept=".xlsx,.xls,.csv" fileName={fileName} onFile={onFile} /></div>
      <div className="mt-4"><NeededColumns onTemplate={onTemplate} /></div>
      <ChapterSelect id="import-chapter" label="Add to" chapters={chapters} value={chapterId} onChange={onChapterChange} />
      <WizardActions nextLabel={isReading ? 'Reading your file…' : 'Check the list'} onNext={onNext} loading={isReading} disabled={!fileName} />
    </section>
  )
}
