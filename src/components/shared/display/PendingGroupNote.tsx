import { Lock } from 'lucide-react'

/** Shown in place of an action a pending (unverified) group can't use yet. */
export function PendingGroupNote({ className }: { className?: string }) {
  return (
    <p className={`faint small row gap-2 ${className ?? ''}`}>
      <Lock className="i" aria-hidden />Available once the Directorate verifies your group
    </p>
  )
}
