/** Geopolitical zones and the states in each (subset used by the mock data). */
export const ZONES = {
  'North West': ['Kano', 'Kaduna', 'Katsina', 'Sokoto', 'Kebbi', 'Jigawa', 'Zamfara'],
  'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
  'North Central': ['FCT', 'Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau'],
  'South West': ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'],
  'South East': ['Anambra', 'Abia', 'Ebonyi', 'Enugu', 'Imo'],
  'South South': ['Rivers', 'Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo'],
} as const

export type Zone = keyof typeof ZONES

export const ZONE_NAMES = Object.keys(ZONES) as Zone[]

