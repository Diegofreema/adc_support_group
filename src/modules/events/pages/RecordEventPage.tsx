import { getRouteApi, Link } from '@tanstack/react-router'

import { Banner, buttonClassName, ErrorState, PageLoader } from '@/components/shared'
import { RecordEventForm } from '../components/RecordEventForm'
import { useEvent } from '../hooks/use-events'
import { useRecordEvent } from '../hooks/use-record-event'
import { canRecord } from '../utils/event-status'
import type { GroupEvent } from '../types'

const routeApi = getRouteApi('/_app/events/$eventId_/record')

export function RecordEventPage() {
  const { eventId } = routeApi.useParams()
  const { data: event, error, refetch } = useEvent(eventId)
  if (error && !event) return <ErrorState title="Could not load this event" error={error} onRetry={() => void refetch()} />
  if (!event) return <PageLoader />
  if (!canRecord(event)) return <NotNow event={event} />
  return <RecordEvent key={event.id} event={event} />
}

function RecordEvent({ event }: { event: GroupEvent }) {
  const flow = useRecordEvent(event)
  return <RecordEventForm event={event} flow={flow} />
}

function notNowText(event: GroupEvent): string {
  if (!event.canManage) return 'Only the organiser can do this.'
  if (event.status === 'cancelled') return 'This event was cancelled.'
  return 'You can do this once the event has started.'
}

/** Already an activity, cancelled, not started, or not theirs to record. */
function NotNow({ event }: { event: GroupEvent }) {
  return (
    <div className="main-narrow mx-auto">
      {event.activityId ? (
        <>
          <Banner tone="success" title="Already an activity" />
          <Link to="/activities/$activityId" params={{ activityId: event.activityId }} className={`${buttonClassName('primary', 'md', true)} mt-5`}>See the activity</Link>
        </>
      ) : (
        <>
          <Banner tone="info" title={notNowText(event)} />
          <Link to="/events/$eventId" params={{ eventId: event.id }} className={`${buttonClassName('secondary', 'md', true)} mt-5`}>Back</Link>
        </>
      )}
    </div>
  )
}
