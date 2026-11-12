import { Check, X } from 'lucide-react'

import { Button, StatusChip } from '@/components/shared'

interface RsvpButtonProps {
  coming: boolean
  busy?: boolean
  /** The screen's one green button. */
  primary?: boolean
  onAnswer: (coming: boolean) => void
}

/** "I'll come", or — once they said so — "Coming" plus a way to take it back. */
export function RsvpButton({ coming, busy, primary, onAnswer }: RsvpButtonProps) {
  if (!coming) {
    return <Button variant={primary ? 'primary' : 'secondary'} icon={Check} disabled={busy} onClick={() => onAnswer(true)}>{busy ? 'Wait…' : 'I’ll come'}</Button>
  }
  return (
    <div className="row wrap gap-2">
      <StatusChip status="approved" label="You’re coming" />
      <Button variant="ghost" size="sm" icon={X} disabled={busy} onClick={() => onAnswer(false)}>{busy ? 'Wait…' : 'Not coming'}</Button>
    </div>
  )
}
