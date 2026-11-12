import { Banner } from '@/components/shared'
import type { GroupEvent } from '../types'

/** For members: checked in, or how to check in while it's open. */
export function CheckinNote({ event }: { event: GroupEvent }) {
  if (event.checkedIn) return <Banner tone="success" title="You’re checked in" />
  if (event.checkinOpen) return <Banner tone="info" title="Scan the QR code at the venue to check in" />
  return null
}
