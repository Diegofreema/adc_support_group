import { CalendarDays } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import type { GroupEvent } from '../types'
import { EventCard } from './EventCard'

interface EventListProps {
  events: GroupEvent[]
  emptyTitle: string
  onAnswer: (id: string, coming: boolean) => void
  pendingId?: string
}

export function EventList({ events, emptyTitle, onAnswer, pendingId }: EventListProps) {
  if (events.length === 0) return <EmptyState icon={CalendarDays} title={emptyTitle} />
  return (
    <div className="grid-2">
      {events.map((event) => <EventCard key={event.id} event={event} onAnswer={onAnswer} busy={pendingId === event.id} />)}
    </div>
  )
}
