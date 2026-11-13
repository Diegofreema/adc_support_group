// Copied from Rise Up (src/components/shared/map3d/useNigeriaStates.ts); keep the two in step.
import { useEffect, useState } from 'react'
import { loadNigeriaStateEntries, type NigeriaStateEntry } from '@/lib/geo/nigeria-map-3d'

/** State outlines from public/nigeria-states.geojson, loaded once per mount. */
export function useNigeriaStates() {
  const [entries, setEntries] = useState<NigeriaStateEntry[]>([])
  useEffect(() => {
    let alive = true
    loadNigeriaStateEntries()
      .then((e) => alive && setEntries(e))
      .catch((err: unknown) => console.warn('useNigeriaStates: GeoJSON load failed', err))
    return () => { alive = false }
  }, [])
  return entries
}
