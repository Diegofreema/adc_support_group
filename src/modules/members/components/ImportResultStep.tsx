import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'

import { Button, ResultHeader, SectionTitle, buttonClassName } from '@/components/shared'
import type { ImportResult } from '../types'
import { ImportCounts } from './ImportCounts'
import { ImportIssueList } from './ImportIssueList'

export function ImportResultStep({ result, onDownloadIssues }: { result: ImportResult; onDownloadIssues: () => void }) {
  const hasIssues = result.notAdded.length > 0
  return (
    <section className="mt-6">
      <ResultHeader title="Done" subtitle="Passwords sent by email or SMS." />
      <div className="mt-6">
        <ImportCounts items={[{ label: 'New', value: result.added, tone: 'green' }, { label: 'Linked', value: result.linked }, { label: 'Not added', value: result.notAdded.length, tone: 'red' }]} />
      </div>
      {hasIssues && (
        <>
          <SectionTitle title="Not added" action={<Button variant="ghost" size="sm" icon={Download} onClick={onDownloadIssues}>Download</Button>} />
          <ImportIssueList issues={result.notAdded} />
        </>
      )}
      <Link to="/members" className={`${buttonClassName('primary', 'lg', true)} mt-6`}>Go to members</Link>
    </section>
  )
}
