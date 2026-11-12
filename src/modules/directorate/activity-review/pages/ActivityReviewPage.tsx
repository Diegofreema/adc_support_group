import { PageHeader } from '@/components/shared'
import { Pager } from '../../shared/components/Pager'
import { ReasonModal } from '../../shared/components/ReasonModal'
import { ActivityCardGrid } from '../components/ActivityCardGrid'
import { ActivityFilters } from '../components/ActivityFilters'
import { ActivityStageTabs } from '../components/ActivityStageTabs'
import { ActivityTable } from '../components/ActivityTable'
import { useActivityQueue, useApproveActivity } from '../hooks/use-activity-review'
import { useRejectActivityFlow } from '../hooks/use-reject-activity-flow'
import { ACTIVITY_REJECT_REASONS } from '../utils/reasons'
import type { ReviewActivity, ReviewStage } from '../types'

export function ActivityReviewPage() {
  const queue = useActivityQueue()
  const approve = useApproveActivity()
  const reject = useRejectActivityFlow()
  const isChecked = queue.stage === 'checked'
  return (
    <>
      <PageHeader title="Activities" />
      <ActivityStageTabs value={queue.stage} counts={queue.counts} onChange={queue.setStage} />
      <ActivityFilters filters={queue.filters} setFilter={queue.setFilter} typeOptions={queue.typeOptions} />
      <div className="mt-4">
        <StageBody stage={queue.stage} rows={queue.rows} onApprove={(id) => approve.mutate(id)} onReject={reject.openFor} />
      </div>
      <Pager paging={queue.paging} total={queue.total} />
      <ReasonModal open={reject.isOpen} onOpenChange={reject.setOpen} title={isChecked ? 'Overturn check' : 'Reject activity'} reasons={ACTIVITY_REJECT_REASONS} form={reject.form} confirmLabel={isChecked ? 'Overturn' : 'Reject'} onConfirm={reject.submit} showPreview />
    </>
  )
}

interface StageBodyProps {
  stage: ReviewStage
  rows: ReviewActivity[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

function StageBody({ stage, rows, onApprove, onReject }: StageBodyProps) {
  if (stage === 'to-check') return <ActivityCardGrid activities={rows} onApprove={onApprove} onReject={onReject} />
  return <ActivityTable rows={rows} onOverturn={stage === 'checked' ? onReject : undefined} />
}
