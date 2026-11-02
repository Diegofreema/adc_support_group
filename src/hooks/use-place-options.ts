import { useMemo } from 'react'

import { lgasFor, NIGERIAN_STATES, wardsFor } from '@/lib/geo/places'

export interface PlaceOptions {
  states: readonly string[]
  lgas: string[]
  wards: string[]
}

/** State → LGA → ward option lists for cascading selects. */
export function usePlaceOptions(state: string, lga: string): PlaceOptions {
  const lgas = useMemo(() => lgasFor(state), [state])
  const wards = useMemo(() => wardsFor(lga), [lga])
  return { states: NIGERIAN_STATES, lgas, wards }
}
