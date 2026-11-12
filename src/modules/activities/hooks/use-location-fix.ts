import { useEffect, useState } from 'react'

import { currentPosition } from '../utils/geolocation'
import type { GeoFix } from '../types'

/** Asks for the phone's position once, quietly. Undefined until (and unless) it arrives. */
export function useLocationFix(): GeoFix | undefined {
  const [fix, setFix] = useState<GeoFix>()
  useEffect(() => {
    let live = true
    void currentPosition().then((position) => { if (live) setFix(position) })
    return () => { live = false }
  }, [])
  return fix
}
