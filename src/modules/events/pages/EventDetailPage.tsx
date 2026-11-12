import { getRouteApi } from '@tanstack/react-router'

import { Banner, ErrorState, PageLoader } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { useDisclosure } from '@/hooks/use-disclosure'
import { CancelEventDialog } from '../components/CancelEventDialog'
import { CheckinNote } from '../components/CheckinNote'
import { CheckinQrModal } from '../components/CheckinQrModal'
import { EventHeader } from '../components/EventHeader'
import { EventInfoCard } from '../components/EventInfoCard'
import { EventManageActions } from '../components/EventManageActions'
import { RsvpButton } from '../components/RsvpButton'
import { useCancelEvent } from '../hooks/use-cancel-event'
import { useEvent } from '../hooks/use-events'
import { useEventRsvp } from '../hooks/use-event-rsvp'
import { canRecord, isUpcoming } from '../utils/event-status'
import type { GroupEvent } from '../types'

const routeApi = getRouteApi('/_app/events/$eventId')

export function EventDetailPage() {
  const { eventId } = routeApi.useParams()
  const { data: event, error, refetch } = useEvent(eventId)
  if (error && !event) return <ErrorState title="Could not load this event" error={error} onRetry={() => void refetch()} />
  if (!event) return <PageLoader shape="detail" />
  return (
    <>
      <EventHeader event={event} />
      {event.status === 'cancelled' && <Banner tone="danger" title="Cancelled" className="mt-4">{event.cancelReason}</Banner>}
      <div className="mt-5">
        <SplitLayout main={<EventMain event={event} />} side={<EventInfoCard event={event} />} />
      </div>
    </>
  )
}

/** Going, checking in, and — for the organiser — running it. */
function EventMain({ event }: { event: GroupEvent }) {
  return (
    <div className="stack [--stack:16px]">
      <CheckinNote event={event} />
      {isUpcoming(event) && <EventRsvp event={event} />}
      {event.canManage && <OrganiserActions event={event} />}
    </div>
  )
}

function EventRsvp({ event }: { event: GroupEvent }) {
  const rsvp = useEventRsvp()
  // The organiser's green button is "Make it an activity" once it has started.
  return <RsvpButton coming={event.myRsvp} busy={rsvp.pendingId === event.id} primary={!canRecord(event)} onAnswer={(coming) => rsvp.answer(event.id, coming)} />
}

function OrganiserActions({ event }: { event: GroupEvent }) {
  const qr = useDisclosure()
  const cancel = useCancelEvent(event.id)
  return (
    <>
      <EventManageActions event={event} onShowQr={qr.open} onCancel={cancel.dialog.open} />
      {event.checkinCode && <CheckinQrModal event={event} code={event.checkinCode} open={qr.isOpen} onOpenChange={qr.setOpen} />}
      <CancelEventDialog open={cancel.dialog.isOpen} onOpenChange={cancel.dialog.setOpen} busy={cancel.isCancelling} onConfirm={cancel.cancel} />
    </>
  )
}
