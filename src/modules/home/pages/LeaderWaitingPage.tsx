import { Banner, Card, PageLoader, StatusChip, Timeline } from '@/components/shared'
import { TwoColumn } from '@/components/layout/TwoColumn'
import { EditDetailsLink } from '../components/waiting/EditDetailsLink'
import { ReviewThread } from '../components/waiting/ReviewThread'
import { useGroupReview, useReplyToDirectorate } from '../hooks/use-group-review'
import type { GroupReview } from '../types/home.types'
import { reviewSteps } from '../utils/review-steps'

/** Pending or rejected group: "Waiting for the Directorate" instead of the dashboard. */
export function LeaderWaitingPage() {
  const { data } = useGroupReview()
  if (!data) return <PageLoader shape="detail" />
  return <Waiting review={data} />
}

function Waiting({ review }: { review: GroupReview }) {
  const reply = useReplyToDirectorate()
  const rejected = review.status === 'rejected'
  const asked = review.waitingForReply
  const status = (
    <div className={asked ? 'mt-6 lg:mt-0' : undefined}>
      <div className="row-between">
        <div>
          <span className="eyebrow">{rejected ? 'Not approved' : 'Waiting for the Directorate'}</span>
          <h1 className="h1 mt-1">{review.name}</h1>
        </div>
        <StatusChip status={review.status} />
      </div>
      <p className="muted mt-2">
        {rejected
          ? 'Fix what the Directorate asked for, then resubmit. Your group goes back into the queue.'
          : 'The Directorate usually checks a new group in 1–3 days. Inviting, adding members, paying and messages open once it is verified.'}
      </p>
      {rejected && review.reviewNote && <Banner tone="danger" title="Reason" className="mt-4">{review.reviewNote}</Banner>}
      <Card className="mt-6"><Timeline steps={reviewSteps(review)} /></Card>
      <EditDetailsLink rejected={rejected} primary={rejected && !asked} />
    </div>
  )
  const thread = (
    <ReviewThread
      review={review}
      sending={reply.isPending}
      onReply={(message, done) => reply.mutate(message, { onSuccess: done })}
    />
  )
  // A question from the Directorate is the one thing to do here, so it goes first.
  return asked ? <TwoColumn stagger left={thread} right={status} /> : <TwoColumn stagger left={status} right={thread} />
}
