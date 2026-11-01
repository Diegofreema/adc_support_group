import { SectionTitle } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { ColumnMapping, ImportCheck, ImportField, ParsedSheet } from '../types'
import { ColumnMappingCard } from './ColumnMappingCard'
import { ImportCounts } from './ImportCounts'
import { ImportPreviewTable } from './ImportPreviewTable'
import { StepFooter } from './StepFooter'

interface ImportCheckStepProps {
  sheet: ParsedSheet
  mapping: ColumnMapping
  check: ImportCheck
  canImport: boolean
  isImporting: boolean
  onMap: (field: ImportField, header: string) => void
  onBack: () => void
  onImport: () => void
}

export function ImportCheckStep({ sheet, mapping, check, canImport, isImporting, onMap, onBack, onImport }: ImportCheckStepProps) {
  return (
    <section className="mt-6">
      <h1 className="h1">Check columns</h1>
      <p className="muted mt-1">{sheet.fileName}</p>
      <div className="mt-5">
        <ImportCounts items={[{ label: 'Rows', value: check.total }, { label: 'Ready', value: check.ready, tone: 'green' }, { label: 'Errors', value: check.issues.length, tone: 'red' }]} />
      </div>
      <div className="mt-4"><ColumnMappingCard headers={sheet.headers} mapping={mapping} onChange={onMap} /></div>
      <SectionTitle title="Preview" />
      <ImportPreviewTable sheet={sheet} mapping={mapping} />
      <StepFooter onBack={onBack} onNext={onImport} label={isImporting ? 'Adding…' : `Add ${formatNumber(check.ready)}`} disabled={isImporting || !canImport} />
    </section>
  )
}
