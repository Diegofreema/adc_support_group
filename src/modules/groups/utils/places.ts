/**
 * Mock Nigerian geography for forms. The real app reads states/LGAs/wards from
 * the polling_units table in Supabase.
 */
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
] as const

const LGAS: Record<string, string[]> = {
  Lagos: ['Surulere', 'Ikeja', 'Alimosho', 'Eti-Osa', 'Kosofe'],
  Kano: ['Municipal', 'Fagge', 'Gwale', 'Nassarawa', 'Dala'],
  Plateau: ['Jos North', 'Jos South', 'Bukuru'],
  FCT: ['AMAC', 'Bwari', 'Gwagwalada'],
  Kaduna: ['Kaduna North', 'Zaria', 'Chikun'],
}

const WARDS: Record<string, string[]> = {
  Surulere: ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'],
  Ikeja: ['Alausa', 'Oregun', 'Anifowoshe'],
  Municipal: ['Kofar Mata', 'Sharada', 'Gandun Albasa'],
  Fagge: ['Fagge A', 'Fagge B', 'Kwachiri'],
  Gwale: ['Gwale', 'Dandago', 'Goron Dutse'],
}

const FALLBACK_LGAS = ['Central', 'North', 'South']
const FALLBACK_WARDS = ['Ward 1', 'Ward 2', 'Ward 3']

export function lgasFor(state: string | undefined): string[] {
  if (!state) return []
  return LGAS[state] ?? FALLBACK_LGAS
}

export function wardsFor(lga: string | undefined): string[] {
  if (!lga) return []
  return WARDS[lga] ?? FALLBACK_WARDS
}

export interface PlaceValue {
  state: string
  lga: string
  ward: string
}

export type PlaceDepth = keyof PlaceValue

/** Change one part of a place; anything below it resets. */
export function updatePlace(value: PlaceValue, part: PlaceDepth, next: string): PlaceValue {
  if (part === 'state') return { state: next, lga: '', ward: '' }
  if (part === 'lga') return { ...value, lga: next, ward: '' }
  return { ...value, ward: next }
}
