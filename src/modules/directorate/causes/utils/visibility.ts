import { ZONES, ZONE_NAMES, type Zone } from '../../shared/constants/geo'
import type { SelectOption } from '@/components/shared'
import type { LookupItem } from '../../shared/services/lookups.service'
import { NIGERIAN_STATES } from '@/lib/geo/places'

/** Who a cause is shown to, as the backend stores it (empty lists = no limit). */
export interface Visibility {
  states: string[]
  categoryIds: string[]
}

export const EVERYONE = 'all'
/** Keep a mix the single picker can't express (set elsewhere). */
export const KEEP = 'keep'

function sameStates(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((state) => b.includes(state))
}

function zoneOf(states: string[]): Zone | undefined {
  return ZONE_NAMES.find((zone) => sameStates(ZONES[zone], states))
}

/** The picker key for stored visibility. */
export function visibilityKey({ states, categoryIds }: Visibility): string {
  if (!states.length && !categoryIds.length) return EVERYONE
  if (!categoryIds.length) {
    const zone = zoneOf(states)
    if (zone) return `zone:${zone}`
    if (states.length === 1) return `state:${states[0]}`
  }
  if (!states.length && categoryIds.length === 1) return `category:${categoryIds[0]}`
  return KEEP
}

/** Stored visibility for a picker key; KEEP returns the current one. */
export function visibilityFromKey(key: string, current: Visibility): Visibility {
  const [kind, value = ''] = key.split(/:(.*)/s)
  if (kind === 'zone') return { states: [...(ZONES[value as Zone] ?? [])], categoryIds: [] }
  if (kind === 'state') return { states: [value], categoryIds: [] }
  if (kind === 'category') return { states: [], categoryIds: [value] }
  if (kind === KEEP) return current
  return { states: [], categoryIds: [] }
}

/** "All groups", "North East", "Kano", "Women", "Women · Kano, Kaduna" */
export function visibilityLabel(states: string[], categoryNames: string[]): string {
  if (!states.length && !categoryNames.length) return 'All groups'
  const place = states.length ? (zoneOf(states) ?? states.join(', ')) : ''
  return [categoryNames.join(', '), place].filter(Boolean).join(' · ')
}

/** Everyone, each zone, each state, each category; plus "keep" when editing a mixed audience. */
export function visibilityOptions(categories: LookupItem[], keepLabel?: string): SelectOption[] {
  return [
    { value: EVERYONE, label: 'All groups' },
    ...(keepLabel ? [{ value: KEEP, label: `As now: ${keepLabel}` }] : []),
    ...ZONE_NAMES.map((zone) => ({ value: `zone:${zone}`, label: `Zone: ${zone}` })),
    ...NIGERIAN_STATES.map((state) => ({ value: `state:${state}`, label: `State: ${state}` })),
    ...categories.map((category) => ({ value: `category:${category.id}`, label: `Category: ${category.name}` })),
  ]
}
