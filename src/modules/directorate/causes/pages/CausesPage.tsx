import { Plus, Target } from 'lucide-react'
import { useState } from 'react'

import { Button, EmptyState, FilterPills, PageHeader } from '@/components/shared'
import { CauseCard } from '../components/CauseCard'
import { CauseFormModal } from '../components/CauseFormModal'
import { useCauseEditor } from '../hooks/use-cause-editor'
import { useCauses } from '../hooks/use-causes'
import { causesWithStatus, statusPills } from '../utils/cause-list'
import type { CauseFilter } from '../types'

export function CausesPage() {
  const [status, setStatus] = useState<CauseFilter>('open')
  const causes = useCauses()
  const editor = useCauseEditor()
  const visible = causesWithStatus(causes, status)
  return (
    <>
      <PageHeader title="Causes" actions={<Button variant="primary" icon={Plus} onClick={editor.openNew}>New cause</Button>} />
      <FilterPills label="Status" options={statusPills(causes)} value={status} onChange={setStatus} />
      <div className="grid-2 mt-4">
        {visible.map((cause) => <CauseCard key={cause.id} cause={cause} onEdit={editor.openEdit} />)}
      </div>
      {!visible.length && <EmptyState icon={Target} title="No causes" />}
      <CauseFormModal editor={editor} />
    </>
  )
}
