/** Small location tree for the mock. The real app reads the polling-unit reference data. */
const LOCATIONS: Record<string, Record<string, string[]>> = {
  Kano: { Municipal: ['Kofar Mata', 'Sharada', 'Zaitawa'], Gwale: ['Dandago', 'Goron Dutse'], Fagge: ['Fagge A', 'Fagge B'] },
  Lagos: { Ikeja: ['Ward A', 'Ward B', 'Ward C'], Surulere: ['Ward 4', 'Ward 7'], Yaba: ['Sabo', 'Akoka'] },
  Plateau: { 'Jos North': ['Ali Kazaure', 'Jenta'], 'Jos South': ['Bukuru', 'Vom'] },
  FCT: { AMAC: ['Garki', 'Wuse'], Bwari: ['Dutse', 'Kubwa'] },
}

export function stateOptions(): string[] {
  return Object.keys(LOCATIONS)
}

export function lgaOptions(state: string): string[] {
  return Object.keys(LOCATIONS[state] ?? {})
}

export function wardOptions(state: string, lga: string): string[] {
  return LOCATIONS[state]?.[lga] ?? []
}
