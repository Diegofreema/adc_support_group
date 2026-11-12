import { Banner, Button } from '@/components/shared'
import { formatDay } from '@/lib/format'
import type { PendingDeletion } from '../types/profile.types'

interface DeletionPendingCardProps {
  pending: PendingDeletion
  onCancel: () => void
  isPending: boolean
}

/** Shown while a "delete my details" request waits its 7 days. */
export function DeletionPendingCard({ pending, onCancel, isPending }: DeletionPendingCardProps) {
  return (
    <Banner tone="warn" title={`Your details will be deleted on ${formatDay(pending.dueAt)}`} className="mb-4">
      <p className="small">You can't log in after that. Changed your mind?</p>
      <Button size="sm" className="mt-2" onClick={onCancel} disabled={isPending}>Cancel deletion</Button>
    </Banner>
  )
}
