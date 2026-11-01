/**
 * Location options for forms. Mock reference data: the real app reads
 * states/LGAs/wards from the shared polling-units table.
 */
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
] as const

const SAMPLE_LGAS: Record<string, string[]> = {
  Lagos: ['Ikeja', 'Surulere', 'Alimosho', 'Eti-Osa', 'Kosofe', 'Oshodi-Isolo'],
  Kano: ['Municipal', 'Fagge', 'Gwale', 'Nassarawa', 'Tarauni', 'Dala'],
  FCT: ['AMAC', 'Bwari', 'Gwagwalada', 'Kuje'],
  Kaduna: ['Kaduna North', 'Kaduna South', 'Zaria', 'Chikun'],
  Plateau: ['Jos North', 'Jos South', 'Bukuru'],
  Rivers: ['Port Harcourt', 'Obio-Akpor', 'Eleme'],
}

export const COUNTRIES = ['United Kingdom', 'United States', 'Canada', 'Ghana', 'South Africa', 'United Arab Emirates', 'Germany'] as const

export function lgasFor(state: string): string[] {
  if (!state) return []
  return SAMPLE_LGAS[state] ?? [`${state} Central`, `${state} North`, `${state} South`]
}

export function wardsFor(lga: string): string[] {
  if (!lga) return []
  return Array.from({ length: 10 }, (_, index) => `Ward ${index + 1}`)
}

export interface PlaceValue {
  state: string
  lga: string
  ward: string
}

/** Changing a higher level clears the levels below it. */
export function cascadePlace(current: PlaceValue, field: keyof PlaceValue, value: string): PlaceValue {
  if (field === 'state') return { state: value, lga: '', ward: '' }
  if (field === 'lga') return { ...current, lga: value, ward: '' }
  return { ...current, ward: value }
}
