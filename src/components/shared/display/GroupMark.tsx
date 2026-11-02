import { initials } from '@/lib/format'
import { cn } from '@/lib/utils'

const TONES = ['', 'g2', 'g3', 'g4', 'g5']

function toneFor(name: string): string {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0)
  return TONES[sum % TONES.length]!
}

/** Square monogram for a group or chapter. */
export function GroupMark({ name, className }: { name: string; className?: string }) {
  return <span className={cn('group-mark', toneFor(name), className)} aria-hidden>{initials(name)}</span>
}
