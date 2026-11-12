import { Card, KeyValueList, type KeyValue } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { eventAudience, eventPlace } from '../utils/event-status'
import { eventWhenLabel } from '../utils/event-time'
import type { GroupEvent } from '../types'

function infoRows(event: GroupEvent): KeyValue[] {
  const rows: KeyValue[] = [
    { label: 'When', value: eventWhenLabel(event.startsAt, event.endsAt) },
    { label: 'Venue', value: event.venue },
    { label: 'Place', value: eventPlace(event) },
    { label: 'For', value: eventAudience(event) },
    { label: 'Coming', value: formatNumber(event.rsvpCount) },
  ]
  if (event.canManage) rows.push({ label: 'Present', value: formatNumber(event.presentCount) })
  if (event.status === 'done') rows.push({ label: 'Guests', value: formatNumber(event.guests) })
  if (event.createdByName) rows.push({ label: 'Organiser', value: event.createdByName })
  return rows
}

export function EventInfoCard({ event }: { event: GroupEvent }) {
  return (
    <Card>
      <KeyValueList items={infoRows(event)} />
      {event.note && <p className="mt-4 whitespace-pre-line">{event.note}</p>}
    </Card>
  )
}
