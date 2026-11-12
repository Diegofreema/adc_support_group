import { CircleCheck, LocateFixed, TriangleAlert } from 'lucide-react'

import { Button } from '@/components/shared'
import type { VenueLocationStatus } from '../hooks/use-venue-location'

const NOTE: Record<VenueLocationStatus, { icon?: typeof CircleCheck; text: string }> = {
  none: { text: 'Only if you are at the venue now. It shows who checks in from far away.' },
  finding: { text: 'Finding you…' },
  saved: { icon: CircleCheck, text: 'Venue location saved' },
  failed: { icon: TriangleAlert, text: 'Could not get your location. Try again outside.' },
}

/** Pins the venue to where the organiser is standing — only when they tap. */
export function VenueLocationButton({ status, onCapture }: { status: VenueLocationStatus; onCapture: () => void }) {
  const note = NOTE[status]
  return (
    <div className="mt-4">
      <Button icon={LocateFixed} disabled={status === 'finding'} onClick={onCapture}>Use my location here</Button>
      <p className="muted small mt-2 row gap-1">
        {note.icon && <note.icon className="i i-sm" aria-hidden />}
        {note.text}
      </p>
    </div>
  )
}
