import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { fetchStrength, fetchStrengthPoints } from '../services/strength.service'
import type { StrengthArea, StrengthScope } from '../types'

/** The area being looked at, its numbers, and the map points of its state. */
export function useStrength() {
  const [scope, setScope] = useState<StrengthScope>({})
  const strength = useQuery({
    queryKey: ['admin', 'strength', scope],
    queryFn: () => fetchStrength(scope),
    placeholderData: keepPreviousData,
  })
  // A state admin's first answer is their state even though nothing was asked.
  const state = strength.data?.state ?? undefined
  const points = useQuery({
    queryKey: ['admin', 'strength-points', state],
    queryFn: () => fetchStrengthPoints(state!),
    enabled: Boolean(state),
  })
  const data = strength.data

  /** Open a row: state → its LGAs → its wards → its units. */
  const open = (row: StrengthArea) => {
    if (!data || data.level === 'unit') return
    if (data.level === 'state') setScope({ state: row.area })
    else if (data.level === 'lga') setScope({ state: data.state!, lga: row.area })
    else setScope({ state: data.state!, lga: data.lga!, ward: row.area })
  }

  return { scope, setScope, strength: data, error: strength.error, isFetching: strength.isFetching, points: points.data ?? [], open }
}
