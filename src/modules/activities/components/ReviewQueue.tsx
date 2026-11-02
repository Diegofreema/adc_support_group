import { ClipboardCheck } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import { useReviewQueue } from '../hooks/use-review-queue'
import type { Activity } from '@/types/domain'
import { RejectActivityDialog } from './RejectActivityDialog'
import { ReviewCard } from './ReviewCard'

/** Activities waiting for approval, with approve/reject actions. */
export function ReviewQueue({ activities }: { activities: Activity[] }) {
  const queue = useReviewQueue()
  if (activities.length === 0) return <EmptyState icon={ClipboardCheck} title="All caught up" />
  return (
    <>
      <div className="grid-2 items-start">
        {activities.map((activity) => (
          <ReviewCard key={activity.id} activity={activity} busy={queue.isBusy} onApprove={queue.approve} onReject={queue.startReject} />
        ))}
      </div>
      <RejectActivityDialog key={queue.rejectingId} open={Boolean(queue.rejectingId)} onOpenChange={queue.closeReject} onConfirm={queue.confirmReject} />
    </>
  )
}
