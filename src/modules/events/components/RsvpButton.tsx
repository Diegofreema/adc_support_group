import { Check, X } from 'lucide-react'

import { Button, StatusChip } from '@/components/shared'

interface RsvpButtonProps {
  coming: boolean
  busy?: boolean
  /** The screen's one green button. */
  primary?: boolean
  onAnswer: (coming: boolean) => void
}

/** "I'll come", or — once they said so — "You're coming" plus a way to take it back. */
export function RsvpButton({ coming, busy, primary, onAnswer }: RsvpButtonProps) {
  if (!coming) {
    return <Button variant={primary ? 'primary' : 'secondary'} icon={Check} loading={busy} onClick={() => onAnswer(true)}>I’ll come</Button>
  }
  return (
    <div className="row wrap gap-2">
      {/* Pops in when they say yes: the answer registered. */}
      <span className="inline-block anim-pop"><StatusChip status="approved" label="You’re coming" /></span>
      <Button variant="ghost" size="sm" icon={X} loading={busy} onClick={() => onAnswer(false)}>Can’t come</Button>
    </div>
  )
}
