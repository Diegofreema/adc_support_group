/**
 * Nigerian geography for forms and filters. Mock reference data: the real app
 * reads states/LGAs/wards from the shared polling_units table in Supabase.
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

const LGAS: Record<string, string[]> = {
  Lagos: ['Ikeja', 'Surulere', 'Yaba', 'Alimosho', 'Eti-Osa', 'Kosofe', 'Oshodi-Isolo'],
  Kano: ['Municipal', 'Fagge', 'Gwale', 'Nassarawa', 'Tarauni', 'Dala'],
  FCT: ['AMAC', 'Bwari', 'Gwagwalada', 'Kuje'],
  Kaduna: ['Kaduna North', 'Kaduna South', 'Zaria', 'Chikun'],
  Plateau: ['Jos North', 'Jos South', 'Bukuru'],
  Rivers: ['Port Harcourt', 'Obio-Akpor', 'Eleme'],
}

const WARDS: Record<string, string[]> = {
  Surulere: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 7'],
  Ikeja: ['Alausa', 'Oregun', 'Anifowoshe', 'Ward A', 'Ward B', 'Ward C'],
  Yaba: ['Sabo', 'Akoka'],
  Municipal: ['Kofar Mata', 'Sharada', 'Gandun Albasa', 'Zaitawa'],
  Fagge: ['Fagge A', 'Fagge B', 'Kwachiri'],
  Gwale: ['Gwale', 'Dandago', 'Goron Dutse'],
  'Jos North': ['Ali Kazaure', 'Jenta'],
  'Jos South': ['Bukuru', 'Vom'],
  AMAC: ['Garki', 'Wuse'],
  Bwari: ['Dutse', 'Kubwa'],
}

const FALLBACK_WARD_COUNT = 10

/** LGAs in a state (sample names for states not in the mock). */
export function lgasFor(state: string | undefined): string[] {
  if (!state) return []
  return LGAS[state] ?? [`${state} Central`, `${state} North`, `${state} South`]
}

/** Wards in an LGA (numbered wards for LGAs not in the mock). */
export function wardsFor(lga: string | undefined): string[] {
  if (!lga) return []
  return WARDS[lga] ?? Array.from({ length: FALLBACK_WARD_COUNT }, (_, index) => `Ward ${index + 1}`)
}

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
