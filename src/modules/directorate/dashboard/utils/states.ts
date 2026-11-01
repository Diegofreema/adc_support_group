import { ZONES, type Zone } from '../../shared/constants/geo'
import type { StateRow } from '../types'

export type ZoneFilter = Zone | 'All'

/** Rows in the chosen zone, biggest first. */
export function statesInZone(rows: StateRow[], zone: ZoneFilter): StateRow[] {
  const inZone = zone === 'All' ? rows : rows.filter((row) => (ZONES[zone] as readonly string[]).includes(row.state))
  return [...inZone].sort((a, b) => b.groups - a.groups)
}
