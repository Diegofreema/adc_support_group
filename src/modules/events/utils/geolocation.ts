import type { VenuePoint } from '../types'

/** Quick and cheap: a check-in must never wait long for GPS. */
export const QUICK_FIX: PositionOptions = { enableHighAccuracy: false, timeout: 8_000, maximumAge: 5 * 60_000 }
/** The venue pin: the organiser is standing there and tapped for it, so ask for a good fix. */
export const VENUE_FIX: PositionOptions = { enableHighAccuracy: true, timeout: 15_000, maximumAge: 0 }

/** The phone's position, or undefined on no support, refusal or timeout. Never throws. */
export function currentPoint(options: PositionOptions): Promise<VenuePoint | undefined> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return Promise.resolve(undefined)
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
      () => resolve(undefined),
      options,
    )
  })
}
