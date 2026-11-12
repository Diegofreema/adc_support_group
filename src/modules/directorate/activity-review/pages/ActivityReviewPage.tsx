import { PageHeader, Skeleton, SkeletonRegion, SkeletonTable } from '@/components/shared'
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
        <StageBody stage={queue.stage} isLoading={queue.isLoading} rows={queue.rows} onApprove={(id) => approve.mutate(id)} onReject={reject.openFor} />
      </div>
      <Pager paging={queue.paging} total={queue.total} />
      <ReasonModal open={reject.isOpen} onOpenChange={reject.setOpen} title={isChecked ? 'Overturn check' : 'Reject activity'} reasons={ACTIVITY_REJECT_REASONS} form={reject.form} confirmLabel={isChecked ? 'Overturn' : 'Reject'} onConfirm={reject.submit} showPreview />
    </>
  )
}

interface StageBodyProps {
  stage: ReviewStage
  isLoading: boolean
  rows: ReviewActivity[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

function StageBody({ stage, isLoading, rows, onApprove, onReject }: StageBodyProps) {
  if (isLoading) return <SkeletonRegion label="Loading activities">{stage === 'to-check' ? <CardGridSkeleton /> : <SkeletonTable />}</SkeletonRegion>
  if (stage === 'to-check') return <ActivityCardGrid activities={rows} onApprove={onApprove} onReject={onReject} />
  return <ActivityTable rows={rows} onOverturn={stage === 'checked' ? onReject : undefined} />
}

/** Review cards: photo strip, tag and status, title, facts, two buttons. */
function CardGridSkeleton() {
  return (
    <div className="grid-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="feed-card">
          <Skeleton h={180} shape="box" className="!rounded-none" />
          <div className="feed-body skel-stack" style={{ gap: 10 }}>
            <span className="row-between"><Skeleton w={70} h={20} shape="round" /><Skeleton w={80} h={20} shape="round" /></span>
            <Skeleton w="70%" h={16} className="mt-1" />
            <Skeleton w="55%" h={11} />
            <Skeleton w="45%" h={11} />
            <span className="grid-2 mt-2 !grid-cols-2"><Skeleton h={44} shape="box" /><Skeleton h={44} shape="box" /></span>
          </div>
        </div>
      ))}
    </div>
  )
}
