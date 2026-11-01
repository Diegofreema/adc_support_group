import { lgaOptions, stateOptions, wardOptions } from '../utils/locations'

/** Cascading options for state → LGA → ward selects. */
export function useLocationOptions(state: string, lga: string) {
  return {
    states: stateOptions(),
    lgas: state ? lgaOptions(state) : [],
    wards: state && lga ? wardOptions(state, lga) : [],
  }
}
