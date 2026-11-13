// Copied from Rise Up (src/lib/nigeria-map-3d.ts); keep the two in step.
/**
 * Shared geometry pipeline for the 3-D Nigeria maps
 * (home hero NigeriaMap3D and the admin battleground map).
 *
 * GeoJSON (public/nigeria-states.geojson, Natural Earth) → mercator-projected
 * THREE.Shape outlines plus a centroid per state, with the name-normalisation
 * both maps need to join map features against database rows.
 */
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface GeoFeature {
  type: 'Feature'
  properties: { name: string }
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

export interface GeoFeatureCollection {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

export interface NigeriaStateEntry {
  /** Canonical display name, e.g. 'Abuja', 'Akwa Ibom' */
  name: string
  shapes: THREE.Shape[]
  /** Projected centroid in Three.js XY space */
  centroid: [number, number]
}

// ─── Name normalisation ────────────────────────────────────────────────────────

// GeoJSON (Natural Earth) → canonical display name
const GEO_NAME_MAP: Record<string, string> = {
  'Federal Capital Territory': 'Abuja',    // GeoJSON uses full name; DB/INEC uses 'FCT'
  'Nassarawa':                 'Nasarawa', // Natural Earth double-s typo
}
export const normalizeStateName = (n: string) => GEO_NAME_MAP[n] ?? n

/**
 * INEC all-caps state name (profiles.voting_state, benchmark_pus_2023.state)
 * → canonical display name. 'LAGOS' → 'Lagos', 'CROSS RIVER' → 'Cross River',
 * FCT variants → 'Abuja', Nassarawa spelling → 'Nasarawa'.
 */
export function inecToDisplayName(raw: string): string {
  const up = raw.trim().toUpperCase()
  if (up === 'FCT' || up === 'ABUJA' || up === 'FCT - ABUJA' || up === 'FEDERAL CAPITAL TERRITORY') return 'Abuja'
  if (up === 'NASSARAWA' || up === 'NASARAWA') return 'Nasarawa'
  return raw.trim().replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

// ─── Number formatting ────────────────────────────────────────────────────────

export function fmtCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

// ─── Projection ────────────────────────────────────────────────────────────────

const PROJ_SIZE  = 400
const PROJ_SCALE = 2600
const THREE_SCALE = PROJ_SIZE / 4

/** Bounds of the projected map in Three.js units — used to frame the camera. */
export const NIGERIA_MAP_BOUNDS = {
  width: 5.45,
  height: 4.43,
}

const projection = geoMercator()
  .center([8.68, 9.08])
  .scale(PROJ_SCALE)
  .translate([PROJ_SIZE / 2, PROJ_SIZE / 2])

export function lonLatToXY(lon: number, lat: number): [number, number] {
  const proj = projection([lon, lat])
  if (!proj) return [0, 0]
  return [
    (proj[0] - PROJ_SIZE / 2) / THREE_SCALE,
    -(proj[1] - PROJ_SIZE / 2) / THREE_SCALE,
  ]
}

// ─── GeoJSON → THREE.Shape ────────────────────────────────────────────────────

function ringToShape(ring: number[][]): THREE.Shape {
  const shape = new THREE.Shape()
  const [fx, fy] = lonLatToXY(ring[0][0], ring[0][1])
  shape.moveTo(fx, fy)
  for (let i = 1; i < ring.length; i++) {
    const [x, y] = lonLatToXY(ring[i][0], ring[i][1])
    shape.lineTo(x, y)
  }
  shape.closePath()
  return shape
}

export function featureToShapes(feature: GeoFeature): THREE.Shape[] {
  const { type, coordinates } = feature.geometry
  if (type === 'Polygon') return [ringToShape(coordinates[0] as number[][])]
  return (coordinates as number[][][][]).map((poly) => ringToShape(poly[0]))
}

/** Fetch the states GeoJSON and build one entry (shapes + centroid) per state. */
export async function loadNigeriaStateEntries(): Promise<NigeriaStateEntry[]> {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const res = await fetch(`${cleanBaseUrl}nigeria-states.geojson`)
  const data: GeoFeatureCollection = await res.json()
  return data.features.map((f) => {
    const shapes = featureToShapes(f)
    // Centroid from first shape's sample points (fast enough at 6 pts)
    const pts = shapes[0]?.getPoints(6) ?? []
    const cx = pts.length ? pts.reduce((s, p) => s + p.x, 0) / pts.length : 0
    const cy = pts.length ? pts.reduce((s, p) => s + p.y, 0) / pts.length : 0
    return {
      name: normalizeStateName(f.properties.name),
      shapes,
      centroid: [cx, cy] as [number, number],
    }
  })
}
