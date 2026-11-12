import { useEventList, useEventRsvp } from '@/modules/events'
import { useRequiredUser } from '@/stores/session-store'

/** How many upcoming events home shows. */
const SHOWN = 2

/** The next upcoming events, with the "I'll come" toggle. */
export function useNextEvents() {
  const user = useRequiredUser()
  const { events } = useEventList(user.activeGroupId ?? '', 'upcoming')
  const rsvp = useEventRsvp()
  return { events: events.slice(0, SHOWN), answer: rsvp.answer, pendingId: rsvp.pendingId }
}
