import { Link } from '@tanstack/react-router'
import { Users } from 'lucide-react'

import { Avatar, Button, EmptyState, List, ListItem, StatusChip } from '@/components/shared'
import type { DuesStatusRow } from '../types'

interface DuesStatusListProps {
  people: DuesStatusRow[]
  period: string
}

/** Each member with Paid / Not paid; unpaid rows get a "Record" shortcut. */
export function DuesStatusList({ people, period }: DuesStatusListProps) {
  if (people.length === 0) return <EmptyState icon={Users} title="No one here" />
  return <List>{people.map((person) => <PersonRow key={person.profileId} person={person} period={period} />)}</List>
}

function PersonRow({ person, period }: { person: DuesStatusRow; period: string }) {
  const trailing = person.paid ? <StatusChip status="paid" /> : (
    <Button asChild size="sm">
      <Link to="/money/dues/new" search={{ member: person.profileId, name: person.name, period }}>Record</Link>
    </Button>
  )
  return <ListItem leading={<Avatar name={person.name} size="sm" />} title={person.name} meta={person.phone} trailing={trailing} />
}
