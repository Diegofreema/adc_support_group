import type { Attendee } from '../types'

/** "1.4 km" / "350 m" */
export function distanceLabel(metres: number): string {
  return metres >= 1000 ? `${(metres / 1000).toFixed(1).replace(/\.0$/, '')} km` : `${Math.round(metres)} m`
}

/** "Far from the venue" or "Far from the venue (2.1 km)" */
export function farLabel(attendee: Attendee): string {
  return attendee.distanceM === undefined ? 'Far from the venue' : `Far from the venue (${distanceLabel(attendee.distanceM)})`
}
