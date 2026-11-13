/** What the strength screen asks about: the nation, a state, an LGA or a ward. */
export interface StrengthScope {
  state?: string
  lga?: string
  ward?: string
}

/** The level the rows are at: states, LGAs, wards or polling units. */
export type StrengthLevel = 'state' | 'lga' | 'ward' | 'unit'

/** One row of the breakdown (a state, LGA, ward or unit). */
export interface StrengthArea {
  area: string
  /** Units only: the unit's name (`area` is its code). */
  name: string | null
  members: number
  voters: number
  /** Members per 1,000 registered voters (null without a voter count). */
  per1000: number | null
  units: number
  unitsEmpty: number
}

export interface StrengthUnit {
  code: string
  name: string
  state: string
  lga: string
  ward: string
  members: number
  voters: number
  per1000: number | null
}

export interface Strength {
  level: StrengthLevel
  state: string | null
  lga: string | null
  ward: string | null
  totals: { members: number; voters: number; units: number; unitsWithMembers: number; per1000: number | null }
  /** Nation and state only: how many members have said where they vote. */
  coverage: { members: number; withUnit: number } | null
  areas: StrengthArea[]
  strongest: StrengthUnit[]
  weakest: StrengthUnit[]
}

/** [unit code, members] for every unit in a state with members. */
export type StrengthPoint = [string, number]
