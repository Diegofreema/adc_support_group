import { Calendar, Flag, MapPin, Users } from 'lucide-react'

import { formatNumber } from '@/lib/format'
import { eventAudience } from '../utils/event-status'
import { eventWhenLabel } from '../utils/event-time'
import type { GroupEvent } from '../types'

/** When · where · who for · how many coming, in one muted line. */
export function EventFacts({ event, className = 'mt-2' }: { event: GroupEvent; className?: string }) {
  return (
    <div className={`facts ${className}`}>
      <span><Calendar className="i" aria-hidden />{eventWhenLabel(event.startsAt, event.endsAt)}</span>
      <span><MapPin className="i" aria-hidden />{event.venue}</span>
      <span><Flag className="i" aria-hidden />{eventAudience(event)}</span>
      <span><Users className="i" aria-hidden />{formatNumber(event.rsvpCount)} coming</span>
    </div>
  )
}
