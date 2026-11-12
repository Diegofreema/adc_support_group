import { Plus, Target } from 'lucide-react'
import { useState } from 'react'

import { Button, EmptyState, FilterPills, PageHeader, Skeleton, SkeletonRegion } from '@/components/shared'
import { CauseCard } from '../components/CauseCard'
import { CauseFormModal } from '../components/CauseFormModal'
import { useCauseEditor } from '../hooks/use-cause-editor'
import { useCauses, useSetCauseStatus } from '../hooks/use-causes'
import { causesWithStatus, statusPills } from '../utils/cause-list'
import type { CauseFilter } from '../types'

export function CausesPage() {
  const [status, setStatus] = useState<CauseFilter>('open')
  const { causes, isLoading } = useCauses()
  const editor = useCauseEditor()
  const statusChange = useSetCauseStatus()
  const visible = causesWithStatus(causes, status)
  return (
    <>
      <PageHeader title="Funding causes" actions={<Button variant="primary" icon={Plus} onClick={editor.openNew}>New cause</Button>} />
      <FilterPills label="Status" options={statusPills(causes, !isLoading)} value={status} onChange={setStatus} />
      {isLoading ? <CausesSkeleton /> : (
        <div className="grid-2 mt-4">
          {visible.map((cause) => <CauseCard key={cause.id} cause={cause} onEdit={editor.openEdit} onToggleStatus={(next) => { statusChange.mutate({ id: cause.id, status: next }); setStatus(next) }} />)}
        </div>
      )}
      {!isLoading && !visible.length && <EmptyState icon={Target} title="No causes" />}
      <CauseFormModal editor={editor} />
    </>
  )
}

/** Cause cards: status and deadline, title, audience, progress, three buttons. */
function CausesSkeleton() {
  return (
    <SkeletonRegion label="Loading causes" className="grid-2 mt-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="card skel-stack" style={{ gap: 10 }}>
          <span className="row-between"><Skeleton w={64} h={20} shape="round" /><Skeleton w={90} h={10} /></span>
          <Skeleton w="65%" h={16} className="mt-1" />
          <Skeleton w="40%" h={11} />
          <Skeleton h={8} shape="round" className="mt-1" />
          <span className="row-between"><Skeleton w="35%" h={12} /><Skeleton w={60} h={11} /></span>
          <span className="grid-3 mt-2 !grid-cols-3"><Skeleton h={36} shape="box" /><Skeleton h={36} shape="box" /><Skeleton h={36} shape="box" /></span>
        </div>
      ))}
    </SkeletonRegion>
  )
}
