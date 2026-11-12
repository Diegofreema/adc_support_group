import { getRouteApi } from '@tanstack/react-router'

import { ErrorState, PageLoader } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { ActivityActions } from '../components/ActivityActions'
import { ActivityGallery } from '../components/ActivityGallery'
import { ActivityHeader } from '../components/ActivityHeader'
import { ActivityInfoCard } from '../components/ActivityInfoCard'
import { ActivityVersions } from '../components/ActivityVersions'
import { ActivityVideoLink } from '../components/ActivityVideoLink'
import { ApprovalCard } from '../components/ApprovalCard'
import { LinkedPaymentCard } from '../components/LinkedPaymentCard'
import { RejectActivityDialog } from '../components/RejectActivityDialog'
import { useActivity, useActivityVersions } from '../hooks/use-activities'
import { useReviewQueue } from '../hooks/use-review-queue'
import { activityPhotos } from '../utils/activity-photos'
import type { ActivityDetail } from '../types'

const routeApi = getRouteApi('/_app/activities/$activityId')

export function ActivityDetailPage() {
  const { activityId } = routeApi.useParams()
  const { data: activity, error, refetch } = useActivity(activityId)
  if (error && !activity) return <ErrorState title="Could not load this activity" error={error} onRetry={() => void refetch()} />
  if (!activity) return <PageLoader shape="detail" />
  return (
    <>
      <ActivityHeader activity={activity} />
      <ActivityReviewActions activity={activity} />
      <div className="mt-5">
        <SplitLayout main={<ActivityMain activity={activity} />} side={<ActivitySide activity={activity} />} />
      </div>
    </>
  )
}

function ActivityReviewActions({ activity }: { activity: ActivityDetail }) {
  const review = useReviewQueue()
  return (
    <>
      <ActivityActions activity={activity} busy={review.isBusy} onApprove={() => review.approve(activity.id)} onSendBack={() => review.startReject(activity.id)} />
      <RejectActivityDialog key={review.rejectingId} open={Boolean(review.rejectingId)} onOpenChange={review.closeReject} onConfirm={review.confirmReject} />
    </>
  )
}

function ActivityMain({ activity }: { activity: ActivityDetail }) {
  return (
    <>
      <ActivityGallery photos={activityPhotos(activity)} />
      {activity.videoUrl && <ActivityVideoLink url={activity.videoUrl} />}
    </>
  )
}

function ActivitySide({ activity }: { activity: ActivityDetail }) {
  const versions = useActivityVersions(activity.id, activity.version > 1).data ?? []
  return (
    <div className="stack [--stack:16px]">
      <ActivityInfoCard activity={activity} />
      <ApprovalCard activity={activity} />
      {activity.linkedPayment && <LinkedPaymentCard payment={activity.linkedPayment} />}
      <ActivityVersions versions={versions} />
    </div>
  )
}
