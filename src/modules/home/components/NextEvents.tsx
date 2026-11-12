import { Link } from '@tanstack/react-router'

import { SectionTitle } from '@/components/shared'
import { EventCard, type GroupEvent } from '@/modules/events'

interface NextEventsProps {
  events: GroupEvent[]
  onAnswer: (id: string, coming: boolean) => void
  pendingId?: string
}

/** "Coming up": the next one or two events, answerable right here. Hidden when there are none. */
export function NextEvents({ events, onAnswer, pendingId }: NextEventsProps) {
  if (events.length === 0) return null
  return (
    <section>
      <SectionTitle title="Coming up" action={<Link to="/events">See all</Link>} />
      <div className="grid gap-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onAnswer={onAnswer} busy={pendingId === event.id} />
        ))}
      </div>
    </section>
  )
}
