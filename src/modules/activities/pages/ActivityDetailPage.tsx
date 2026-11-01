import { getRouteApi } from '@tanstack/react-router'

import { PageLoader } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { ActivityGallery } from '../components/ActivityGallery'
import { ActivityHeader } from '../components/ActivityHeader'
import { ActivityInfoCard } from '../components/ActivityInfoCard'
import { ActivityVideoLink } from '../components/ActivityVideoLink'
import { ApprovalCard } from '../components/ApprovalCard'
import { LinkedPaymentCard } from '../components/LinkedPaymentCard'
import { useActivity } from '../hooks/use-activities'
import type { ActivityDetail } from '../types'

const routeApi = getRouteApi('/_app/activities/$activityId')

export function ActivityDetailPage() {
  const { activityId } = routeApi.useParams()
  const { data: activity } = useActivity(activityId)
  if (!activity) return <PageLoader />
  return (
    <>
      <ActivityHeader activity={activity} />
      <div className="mt-5">
        <SplitLayout main={<ActivityMain activity={activity} />} side={<ActivitySide activity={activity} />} />
      </div>
    </>
  )
}

function ActivityMain({ activity }: { activity: ActivityDetail }) {
  return (
    <>
      <ActivityGallery tones={activity.photoTones} />
      {activity.videoUrl && <ActivityVideoLink url={activity.videoUrl} />}
    </>
  )
}

function ActivitySide({ activity }: { activity: ActivityDetail }) {
  return (
    <div className="stack [--stack:16px]">
      <ActivityInfoCard activity={activity} />
      <ApprovalCard activity={activity} />
      {activity.linkedPayment && <LinkedPaymentCard payment={activity.linkedPayment} />}
    </div>
  )
}
