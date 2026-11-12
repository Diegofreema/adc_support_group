import type { GeoFix } from '../types'

const OPTIONS: PositionOptions = { enableHighAccuracy: false, timeout: 8_000, maximumAge: 5 * 60_000 }

/** The phone's position if it gives one quickly; undefined on no support, refusal or timeout. Never throws. */
export function currentPosition(): Promise<GeoFix | undefined> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) return Promise.resolve(undefined)
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude, accuracyM: coords.accuracy }),
      () => resolve(undefined),
      OPTIONS,
    )
  })
}
