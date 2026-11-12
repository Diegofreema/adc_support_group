import type { EventInput, GroupEvent, VenuePoint } from '../types'
import type { EventForm } from './event-schema'
import { fromLocalInputs, todayInput, toLocalInputs } from './event-time'

export function emptyEventForm(type = ''): EventForm {
  return { type, title: '', date: todayInput(), startTime: '', endTime: '', venue: '', state: '', lga: '', ward: '', chapterId: '', note: '' }
}

/** A saved event back into the form. */
export function eventToForm(event: GroupEvent): EventForm {
  const start = toLocalInputs(event.startsAt)
  return {
    type: event.type,
    title: event.title,
    date: start.date,
    startTime: start.time,
    endTime: event.endsAt ? toLocalInputs(event.endsAt).time : '',
    venue: event.venue,
    state: event.state,
    lga: event.lga,
    ward: event.ward,
    chapterId: event.chapterId ?? '',
    note: event.note ?? '',
  }
}

export function buildEventInput(values: EventForm, location?: VenuePoint): EventInput {
  return {
    type: values.type,
    title: values.title.trim(),
    startsAt: fromLocalInputs(values.date, values.startTime),
    endsAt: values.endTime ? fromLocalInputs(values.date, values.endTime) : undefined,
    venue: values.venue.trim(),
    state: values.state,
    lga: values.lga,
    ward: values.ward,
    note: values.note.trim() || undefined,
    chapterId: values.chapterId || undefined,
    location,
  }
}
