import { StatusChip } from '@/components/shared'
import { eventChip } from '../utils/event-status'
import type { GroupEvent } from '../types'

/** Cancelled, Done, On now or Ended; nothing for an ordinary upcoming event. */
export function EventStatusChip({ event }: { event: GroupEvent }) {
  const chip = eventChip(event)
  return chip ? <StatusChip status={chip.status} label={chip.label} /> : null
}
