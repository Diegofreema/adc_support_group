import { Link } from '@tanstack/react-router'

import { isUpcoming } from '../utils/event-status'
import type { GroupEvent } from '../types'
import { EventFacts } from './EventFacts'
import { EventStatusChip } from './EventStatusChip'
import { EventTypeTag } from './EventTypeTag'
import { RsvpButton } from './RsvpButton'

interface EventCardProps {
  event: GroupEvent
  /** Omit to hide the RSVP toggle. */
  onAnswer?: (id: string, coming: boolean) => void
  busy?: boolean
}

/** One event in a list: tap it to open; answer right on the card while it's upcoming. */
export function EventCard({ event, onAnswer, busy }: EventCardProps) {
  return (
    <div className="card">
      <Link to="/events/$eventId" params={{ eventId: event.id }} className="block text-inherit">
        <div className="row-between">
          <EventTypeTag type={event.type} label={event.typeName} />
          <EventStatusChip event={event} />
        </div>
        <h3 className="h3 mt-3">{event.title}</h3>
        <EventFacts event={event} />
      </Link>
      {onAnswer && isUpcoming(event) && (
        <div className="mt-4"><RsvpButton coming={event.myRsvp} busy={busy} onAnswer={(coming) => onAnswer(event.id, coming)} /></div>
      )}
    </div>
  )
}
