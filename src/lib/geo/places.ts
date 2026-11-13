/**
 * Nigerian geography for forms and filters. LGAs and wards come from the INEC
 * polling-unit list (./voting-area, the same files Rise Up uses).
 */
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
] as const

export type NigerianState = (typeof NIGERIAN_STATES)[number]

/** Countries offered to diaspora groups. */
export const COUNTRIES = ['United Kingdom', 'United States', 'Canada', 'Ghana', 'South Africa', 'United Arab Emirates', 'Germany'] as const

export interface PlaceValue {
  state: string
  lga: string
  ward: string
}

export type PlacePart = keyof PlaceValue

export const PLACE_PARTS: PlacePart[] = ['state', 'lga', 'ward']

export const EMPTY_PLACE: PlaceValue = { state: '', lga: '', ward: '' }

/** Change one part of a place; anything below it resets. */
export function updatePlace(value: PlaceValue, part: PlacePart, next: string): PlaceValue {
  if (part === 'state') return { state: next, lga: '', ward: '' }
  if (part === 'lga') return { ...value, lga: next, ward: '' }
  return { ...value, ward: next }
}

/** True when `part` should be asked for at this depth (state < lga < ward). */
export function placePartShown(part: PlacePart, depth: PlacePart): boolean {
  return PLACE_PARTS.indexOf(part) <= PLACE_PARTS.indexOf(depth)
}
