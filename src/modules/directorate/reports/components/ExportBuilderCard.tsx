import { Download } from 'lucide-react'

import { Button, Card } from '@/components/shared'
import type { ExportBuilder } from '../hooks/use-exports'
import { ExportFilters } from './ExportFilters'
import { ExportSubjectPicker } from './ExportSubjectPicker'

export function ExportBuilderCard({ builder }: { builder: ExportBuilder }) {
  const { spec, update } = builder
  return (
    <Card>
      <ExportSubjectPicker value={spec.subject} onChange={update('subject')} />
      <ExportFilters builder={builder} />
      <p className="small faint mt-4">Downloads a CSV file. Excel and Google Sheets open it.</p>
      <Button variant="primary" size="lg" block icon={Download} className="mt-4" disabled={builder.preparing} onClick={builder.download}>
        {builder.preparing ? 'Preparing…' : 'Download'}
      </Button>
    </Card>
  )
}
