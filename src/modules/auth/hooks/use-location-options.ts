import { useMemo } from 'react'

import { lgasFor, NIGERIAN_STATES, wardsFor } from '../utils/places'

/** State → LGA → ward option lists for cascading selects. */
export function useLocationOptions(state: string, lga: string) {
  const lgas = useMemo(() => lgasFor(state), [state])
  const wards = useMemo(() => wardsFor(lga), [lga])
  return { states: NIGERIAN_STATES, lgas, wards }
}
