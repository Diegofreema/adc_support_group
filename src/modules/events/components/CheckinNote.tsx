import { Banner } from '@/components/shared'
import type { GroupEvent } from '../types'

/** For members: checked in, or how to check in while it's open. */
export function CheckinNote({ event }: { event: GroupEvent }) {
  if (event.checkedIn) return <Banner tone="success" title="You’re checked in" />
  // The organiser shows the QR; telling them to scan it would make no sense.
  if (event.checkinOpen && !event.canManage) return <Banner tone="info" title="At the venue? Scan the organiser’s QR code with your camera to check in." />
  return null
}
