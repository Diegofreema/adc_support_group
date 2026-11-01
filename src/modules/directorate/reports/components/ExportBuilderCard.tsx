import { Download } from 'lucide-react'

import { Button, Card, Field, Segmented } from '@/components/shared'
import type { ExportBuilder } from '../hooks/use-exports'
import { ExportFilters } from './ExportFilters'
import { ExportSubjectPicker } from './ExportSubjectPicker'

const FORMATS = [{ value: 'excel' as const, label: 'Excel' }, { value: 'csv' as const, label: 'CSV' }]

export function ExportBuilderCard({ builder }: { builder: ExportBuilder }) {
  const { spec, update } = builder
  return (
    <Card>
      <ExportSubjectPicker value={spec.subject} onChange={update('subject')} />
      <ExportFilters builder={builder} />
      <Field label="Format" className="mt-4"><Segmented label="Format" options={FORMATS} value={spec.format} onChange={update('format')} /></Field>
      <Button variant="primary" size="lg" block icon={Download} className="mt-6" disabled={builder.preparing} onClick={builder.download}>
        {builder.preparing ? 'Preparing…' : 'Download'}
      </Button>
    </Card>
  )
}
