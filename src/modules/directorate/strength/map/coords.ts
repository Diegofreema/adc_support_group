import { lonLatToXY } from '@/lib/geo/nigeria-map-3d'
import type { StrengthPoint } from '../types'

/** public/pu-coords/<STATE>.json (copied from Rise Up): [code, lga index, lon, lat]. */
interface PuCoordsFile {
  lgas: string[]
  units: [string, number, number, number][]
}

export interface MapUnit {
  code: string
  lga: string
  x: number
  y: number
  members: number
}

const cache = new Map<string, PuCoordsFile>()

async function loadCoords(state: string): Promise<PuCoordsFile> {
  const key = state.toUpperCase()
  const hit = cache.get(key)
  if (hit) return hit
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const res = await fetch(`${base}pu-coords/${key.replace(/ /g, '_')}.json`)
  if (!res.ok) throw new Error(`No map for ${state}`)
  const file = (await res.json()) as PuCoordsFile
  cache.set(key, file)
  return file
}

/** Every unit of a state with coordinates, joined to its member count. */
export async function loadMapUnits(state: string, points: StrengthPoint[]): Promise<MapUnit[]> {
  const coords = await loadCoords(state)
  const members = new Map(points)
  return coords.units.map(([code, lgaIndex, lon, lat]) => {
    const [x, y] = lonLatToXY(lon, lat)
    return { code, lga: coords.lgas[lgaIndex] ?? '', x, y, members: members.get(code) ?? 0 }
  })
}

/** LGA names in the coordinate files vs the stored ones ("IFAKO-IJAYE" vs "Ifako-Ijaiye"): compare letters only. */
export function sameLga(a: string, b: string): boolean {
  const key = (value: string) => value.toUpperCase().replace(/[^A-Z]/g, '')
  return key(a) === key(b)
}

export function unitFrame(units: MapUnit[]) {
  if (units.length === 0) return null
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const u of units) {
    minX = Math.min(minX, u.x); maxX = Math.max(maxX, u.x)
    minY = Math.min(minY, u.y); maxY = Math.max(maxY, u.y)
  }
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, width: Math.max(maxX - minX, 0.2), height: Math.max(maxY - minY, 0.2) }
}
