/** Public API of the events module (for home, notifications and nav). */
export { EventCard } from './components/EventCard'
export { useEventList, eventListQuery } from './hooks/use-event-list'
export { useEventRsvp } from './hooks/use-event-rsvp'
export { eventQuery } from './hooks/use-events'
export { eventKeys } from './utils/event-keys'
export type { GroupEvent, EventWhen } from './types'
