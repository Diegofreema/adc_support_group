import { NIGERIAN_STATES } from '@/lib/geo/places'
import { useVotingArea } from '@/lib/geo/voting-area'

export interface PlaceOptions {
  states: readonly string[]
  lgas: string[]
  wards: string[]
}

/** State → LGA → ward option lists for cascading selects, from the INEC list (loaded per state). */
export function usePlaceOptions(state: string, lga: string): PlaceOptions {
  const { lgas, wards } = useVotingArea(state, lga, '')
  return { states: NIGERIAN_STATES, lgas, wards }
}
