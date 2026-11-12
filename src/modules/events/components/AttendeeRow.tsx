import { CalendarCheck, MapPinOff, QrCode } from 'lucide-react'

import { Checkbox, Tag } from '@/components/shared'
import { farLabel } from '../utils/attendance-marks'
import type { Attendee } from '../types'

interface AttendeeRowProps {
  person: Attendee
  disabled?: boolean
  onMark: (profileId: string, present: boolean) => void
}

/** Marks beside a name: said they'd come, came by QR, far from the venue. */
function AttendeeMarks({ person }: { person: Attendee }) {
  const marks = person.coming || (person.present && person.via === 'qr') || person.farFromVenue
  if (!marks) return null
  return (
    <span className="row wrap gap-1 mt-1">
      {person.coming && <Tag icon={CalendarCheck}>Said coming</Tag>}
      {person.present && person.via === 'qr' && <Tag icon={QrCode}>Came by QR</Tag>}
      {person.farFromVenue && <Tag icon={MapPinOff}>{farLabel(person)}</Tag>}
    </span>
  )
}

/** One person: tick = present. */
export function AttendeeRow({ person, disabled, onMark }: AttendeeRowProps) {
  return (
    <div className="list-item">
      <Checkbox checked={person.present} disabled={disabled} onChange={(event) => onMark(person.profileId, event.target.checked)}>
        <span className="title block">{person.name}</span>
        {person.phone && <span className="meta block">{person.phone}</span>}
        <AttendeeMarks person={person} />
      </Checkbox>
    </div>
  )
}
