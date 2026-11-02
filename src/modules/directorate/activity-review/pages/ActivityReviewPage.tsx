import { PageHeader } from '@/components/shared'
import { ReasonModal } from '../../shared/components/ReasonModal'
import { ActivityCardGrid } from '../components/ActivityCardGrid'
import { ActivityFilters } from '../components/ActivityFilters'
import { ActivityStageTabs } from '../components/ActivityStageTabs'
import { LeaderApprovedTable } from '../components/LeaderApprovedTable'
import { useActivityQueue, useApproveActivity } from '../hooks/use-activity-review'
import { useRejectActivityFlow } from '../hooks/use-reject-activity-flow'
import { ACTIVITY_REJECT_REASONS } from '../utils/reasons'

export function ActivityReviewPage() {
  const queue = useActivityQueue()
  const approve = useApproveActivity()
  const reject = useRejectActivityFlow()
  const isLeaderTab = queue.stage === 'leader-approved'
  return (
    <>
      <PageHeader title="Activities" />
      <ActivityStageTabs value={queue.stage} counts={queue.counts} onChange={queue.setStage} />
      <ActivityFilters filters={queue.filters} setFilter={queue.setFilter} />
      <div className="mt-4">
        {isLeaderTab
          ? <LeaderApprovedTable rows={queue.rows} onOverturn={reject.openFor} />
          : <ActivityCardGrid activities={queue.rows} onApprove={(id) => approve.mutate(id)} onReject={reject.openFor} />}
      </div>
      <ReasonModal open={reject.isOpen} onOpenChange={reject.setOpen} title={isLeaderTab ? 'Overturn approval' : 'Reject activity'} reasons={ACTIVITY_REJECT_REASONS} form={reject.form} confirmLabel={isLeaderTab ? 'Overturn' : 'Reject'} onConfirm={reject.submit} showPreview />
    </>
  )
}
