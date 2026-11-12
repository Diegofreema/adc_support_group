import { getRouteApi, Link } from '@tanstack/react-router'

import { Banner, ErrorState, PageLoader, buttonClassName } from '@/components/shared'
import { ActivityWizard } from '../components/ActivityWizard'
import { useActivity } from '../hooks/use-activities'
import { useEditActivity } from '../hooks/use-edit-activity'
import type { ActivityDetail } from '../types'

const routeApi = getRouteApi('/_app/activities/$activityId_/edit')

export function EditActivityPage() {
  const { activityId } = routeApi.useParams()
  const { data: activity, error, refetch } = useActivity(activityId)
  if (error && !activity) return <ErrorState title="Could not load this activity" error={error} onRetry={() => void refetch()} />
  if (!activity) return <PageLoader />
  if (!activity.canEdit) return <LockedNote activityId={activityId} />
  return <EditActivityWizard key={`${activity.id}-${activity.version}`} activity={activity} />
}

function EditActivityWizard({ activity }: { activity: ActivityDetail }) {
  const flow = useEditActivity(activity)
  return <div className="main-narrow mx-auto"><ActivityWizard flow={flow} /></div>
}

function LockedNote({ activityId }: { activityId: string }) {
  return (
    <div className="main-narrow mx-auto">
      <Banner tone="info" title="This activity can't be changed">Approved activities are locked.</Banner>
      <Link to="/activities/$activityId" params={{ activityId }} className={`${buttonClassName('secondary', 'md', true)} mt-5`}>Back</Link>
    </div>
  )
}
