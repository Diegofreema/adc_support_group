import { useState } from 'react'

import { currentPoint, VENUE_FIX } from '../utils/geolocation'
import type { VenuePoint } from '../types'

export type VenueLocationStatus = 'none' | 'finding' | 'saved' | 'failed'

/** The venue pin, taken only when the organiser taps for it. `saved` starts true when the event already has one. */
export function useVenueLocation(alreadySaved = false) {
  const [point, setPoint] = useState<VenuePoint>()
  const [status, setStatus] = useState<VenueLocationStatus>(alreadySaved ? 'saved' : 'none')

  const capture = async () => {
    setStatus('finding')
    const fix = await currentPoint(VENUE_FIX)
    setPoint(fix ?? point)
    setStatus(fix ? 'saved' : 'failed')
  }

  return { point, status, capture: () => void capture() }
}
