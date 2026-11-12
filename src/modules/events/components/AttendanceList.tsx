import { Users } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import type { Attendee } from '../types'
import { AttendeeRow } from './AttendeeRow'

interface AttendanceListProps {
  people: Attendee[]
  disabled?: boolean
  onMark: (profileId: string, present: boolean) => void
}

export function AttendanceList({ people, disabled, onMark }: AttendanceListProps) {
  if (people.length === 0) return <EmptyState icon={Users} title="No one here" />
  return (
    <div className="list">
      {people.map((person) => <AttendeeRow key={person.profileId} person={person} disabled={disabled} onMark={onMark} />)}
    </div>
  )
}
