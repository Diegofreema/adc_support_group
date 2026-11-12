import type { GroupEvent } from '../types'
import { EventFacts } from './EventFacts'
import { EventStatusChip } from './EventStatusChip'
import { EventTypeTag } from './EventTypeTag'

export function EventHeader({ event }: { event: GroupEvent }) {
  return (
    <header>
      <div className="row-between wrap gap-2">
        <EventTypeTag type={event.type} label={event.typeName} />
        <EventStatusChip event={event} />
      </div>
      <h1 className="h1 mt-3">{event.title}</h1>
      <EventFacts event={event} />
    </header>
  )
}
