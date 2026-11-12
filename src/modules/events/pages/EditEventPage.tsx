import { getRouteApi, Link } from '@tanstack/react-router'

import { Banner, buttonClassName, ErrorState, PageLoader } from '@/components/shared'
import { EventFormView } from '../components/EventFormView'
import { useEvent } from '../hooks/use-events'
import { useEventForm } from '../hooks/use-event-form'
import { eventAudience } from '../utils/event-status'
import type { GroupEvent } from '../types'

const routeApi = getRouteApi('/_app/events/$eventId_/edit')

export function EditEventPage() {
  const { eventId } = routeApi.useParams()
  const { data: event, error, refetch } = useEvent(eventId)
  if (error && !event) return <ErrorState title="Could not load this event" error={error} onRetry={() => void refetch()} />
  if (!event) return <PageLoader shape="form" />
  if (!event.canManage || event.status !== 'scheduled') return <LockedNote eventId={eventId} />
  return <EditEventForm key={event.id} event={event} />
}

function EditEventForm({ event }: { event: GroupEvent }) {
  const flow = useEventForm(event)
  return <EventFormView flow={flow} heading="Edit event" submitLabel="Save changes" fixedChapterLabel={eventAudience(event)} />
}

function LockedNote({ eventId }: { eventId: string }) {
  return (
    <div className="main-narrow mx-auto">
      <Banner tone="info" title="This event can't be changed">Only the organiser can change an event, and only before it is cancelled or done.</Banner>
      <Link to="/events/$eventId" params={{ eventId }} className={`${buttonClassName('secondary', 'md', true)} mt-5`}>Back</Link>
    </div>
  )
}
