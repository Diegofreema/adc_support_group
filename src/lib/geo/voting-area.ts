// Copied from Rise Up (src/lib/voting-area.ts); keep the two in step.
import { useState, useEffect } from 'react'
import { NIGERIAN_STATES } from './nigeria-geodata'

// Per-state data: { [lga]: { [ward]: [{ c: code, n: name }] } }
type RawPU = { c: string; n: string }
type StateData = Record<string, Record<string, RawPU[]>>

export type PollingUnit = { code: string; name: string }

export const VOTING_STATES = [
  'ABIA', 'ADAMAWA', 'AKWA IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA', 'BENUE',
  'BORNO', 'CROSS RIVER', 'DELTA', 'EBONYI', 'EDO', 'EKITI', 'ENUGU', 'FCT',
  'GOMBE', 'IMO', 'JIGAWA', 'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'KOGI',
  'KWARA', 'LAGOS', 'NASARAWA', 'NIGER', 'OGUN', 'ONDO', 'OSUN', 'OYO',
  'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA',
] as const

const stateCache = new Map<string, StateData>()

function findKeyCaseInsensitive(obj: Record<string, unknown>, targetKey: string): string | undefined {
  if (!targetKey) return undefined
  const upperTarget = targetKey.trim().toUpperCase()
  return Object.keys(obj).find(k => k.trim().toUpperCase() === upperTarget)
}

function normalizeLgaLookupKey(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^A-Z0-9]+/g, ' ')
    .replace(/\bMUNICIPALITY\b/g, 'MUNICIPAL')
    .replace(/\s+/g, ' ')
    .trim()
}

// The polling-unit files contain useful source keys, but some use alternate
// spellings or typos. Keep those keys for ward/PU lookup and expose the
// canonical names from nigeria-geodata to users and reports.
const VOTING_LGA_ALIASES: readonly [string, string, string][] = [
  ['ABIA', 'OBINGWA', 'Obi Ngwa'],
  ['ADAMAWA', 'GIRE 1', 'Girei'],
  ['ANAMBRA', 'IHALA', 'Ihiala'],
  ['BAUCHI', 'DAMBAM', 'Damban'],
  ['BORNO', 'MAIDUGURI M. C.', 'Maiduguri'],
  ['CROSS RIVER', 'CALABAR MUNICIPALITY', 'Calabar Municipal'],
  ['EDO', 'UHUNMWODE', 'Uhunmwonde'],
  ['FCT', 'MUNICIPAL', 'Abuja Municipal'],
  ['GOMBE', 'SHONGOM', 'Shomgom'],
  ['GOMBE', 'YALMALTU/ DEBA', 'Yamaltu/Deba'],
  ['IMO', 'EZINIHITTE MBAISE', 'Ezinihitte'],
  ['JIGAWA', 'BIRNIWA', 'Biriniwa'],
  ['JIGAWA', 'KIRIKA SAMMA', 'Kiri Kasama'],
  ['KANO', 'DANBATA', 'Dambatta'],
  ['KANO', 'DAWAKI KUDU', 'Dawakin Kudu'],
  ['KANO', 'DAWAKI TOFA', 'Dawakin Tofa'],
  ['KANO', 'GARUN MALAM', 'Garun Mallam'],
  ['KANO', 'NASARAWA', 'Nassarawa'],
  ['KATSINA', 'MALUFASHI', 'Malumfashi'],
  ['KEBBI', 'AREWA', 'Arewa Dandi'],
  ['KOGI', 'KOGI . K. K.', 'Kogi'],
  ['KOGI', 'MOPA MORO', 'Mopa Muro'],
  ['KOGI', 'OGORI MANGOGO', 'Ogori/Magongo'],
  ['KWARA', 'PATIGI', 'Pategi'],
  ['LAGOS', 'IFAKO-IJAYE', 'Ifako-Ijaiye'],
  ['LAGOS', 'SOMOLU', 'Shomolu'],
  ['NASARAWA', 'NASARAWA EGGON', 'Nasarawa Egon'],
  ['NIGER', 'EDATTI', 'Edati'],
  ['NIGER', 'MUNYA', 'Moya'],
  ['OGUN', 'OGUN WATER SIDE', 'Ogun Waterside'],
  ['OGUN', 'SAGAMU', 'Shagamu'],
  ['ONDO', 'ILEOLUJI/OKEIGBO', 'Ile Oluji/Okeigbo'],
  ['OSUN', 'AYEDAADE', 'Aiyedade'],
  ['OSUN', 'AYEDIRE', 'Aiyedire'],
  ['OYO', 'OGBOMOSO NORTH', 'Ogbomosho North'],
  ['OYO', 'OGBOMOSO SOUTH', 'Ogbomosho South'],
  ['OYO', 'OORELOPE', 'Orelope'],
  ['OYO', 'ORI IRE', 'Orire'],
  ['PLATEAU', 'BARIKIN LADI', 'Barkin Ladi'],
  ['RIVERS', 'EMOHUA', 'Emuoha'],
  ['RIVERS', 'OPOBO/NEKORO', 'Opobo/Nkoro'],
  ['SOKOTO', 'S/BIRNI', 'Sabon Birni'],
  ['SOKOTO', 'WAMAKKO', 'Wamako'],
  ['TARABA', 'KURMI', 'Kumi'],
  ['YOBE', 'KARASAWA', 'Karasuwa'],
  ['YOBE', 'TARMUWA', 'Tarmuwa'],
  ['YOBE', 'TARMUA', 'Tarmuwa'],
  ['ZAMFARA', 'BIRNIN MAGAJI', 'Birnin Magaji/Kiyaw'],
] as const

const votingLgaAliasMap = new Map(
  VOTING_LGA_ALIASES.map(([state, source, canonical]) => [
    `${state}::${normalizeLgaLookupKey(source)}`,
    canonical,
  ]),
)

function getGeodataState(state: string) {
  const normalizedState = normalizeStateName(state)
  return NIGERIAN_STATES.find((entry) => normalizeStateName(entry.name) === normalizedState)
}

export function canonicalizeVotingLga(state: string, lga: string): string | null {
  if (!lga?.trim()) return null

  const stateKey = normalizeStateName(state)
  const sourceKey = normalizeLgaLookupKey(lga)
  const aliased = votingLgaAliasMap.get(`${stateKey}::${sourceKey}`)
  if (aliased) return aliased

  const geodataState = getGeodataState(state)
  return geodataState?.lgas.find((candidate) => normalizeLgaLookupKey(candidate) === sourceKey) ?? null
}

function findVotingLgaDataKey(data: StateData, state: string, lga: string) {
  return findKeyCaseInsensitive(data, lga) ?? Object.keys(data).find((sourceLga) => {
    const canonicalSource = canonicalizeVotingLga(state, sourceLga)
    const canonicalTarget = canonicalizeVotingLga(state, lga)
    return !!canonicalSource && canonicalSource === canonicalTarget
  })
}

export function normalizeStateName(state: string): string {
  if (!state) return ''
  const upper = state.trim().toUpperCase()
  const exact = (VOTING_STATES as readonly string[]).find(vs => vs === upper)
  if (exact) return exact
  const partial = (VOTING_STATES as readonly string[]).find(vs => upper.startsWith(vs))
  return partial ?? upper
}

export async function loadStateData(state: string): Promise<StateData> {
  const normState = normalizeStateName(state)
  if (!normState) throw new Error('State name is empty')
  if (stateCache.has(normState)) return stateCache.get(normState)!
  const fname = normState.replace(/ /g, '_')
  const baseUrl = import.meta.env.BASE_URL || '/'
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const res = await fetch(`${cleanBaseUrl}pu/${fname}.json`)
  if (!res.ok) throw new Error(`Could not load polling units for ${state}`)
  const data = (await res.json()) as StateData
  stateCache.set(normState, data)
  return data
}

export function getVotingLGAs(data: StateData, state = ''): string[] {
  const geodataState = getGeodataState(state)
  if (!geodataState) return Object.keys(data).sort()

  return geodataState.lgas
}

export function getVotingWards(data: StateData, lga: string, state = ''): string[] {
  if (!lga) return []
  const matchedLgaKey = findVotingLgaDataKey(data, state, lga)
  if (!matchedLgaKey) return []
  return Object.keys(data[matchedLgaKey] ?? {}).sort()
}

export function getPollingUnits(data: StateData, lga: string, ward: string, state = ''): PollingUnit[] {
  if (!lga || !ward) return []
  const matchedLgaKey = findVotingLgaDataKey(data, state, lga)
  if (!matchedLgaKey) return []
  const wardsObj = data[matchedLgaKey] ?? {}
  const matchedWardKey = findKeyCaseInsensitive(wardsObj, ward)
  if (!matchedWardKey) return []
  return (wardsObj[matchedWardKey] ?? []).map(({ c, n }) => ({ code: c, name: n }))
}

export function useVotingArea(state: string, lga: string, ward: string) {
  const [stateData, setStateData] = useState<StateData | null>(null)
  const [loading, setLoading]     = useState(false)
  const normState = normalizeStateName(state)

  useEffect(() => {
    if (!state) { setStateData(null); return }
    setLoading(true)
    loadStateData(state)
      .then(setStateData)
      .catch(() => setStateData(null))
      .finally(() => setLoading(false))
  }, [state])

  const lgas         = stateData ? getVotingLGAs(stateData, normState) : []
  const wards        = stateData && lga  ? getVotingWards(stateData, lga, normState)           : []
  const pollingUnits = stateData && lga && ward ? getPollingUnits(stateData, lga, ward, normState) : []

  return { lgas, wards, pollingUnits, loading }
}
