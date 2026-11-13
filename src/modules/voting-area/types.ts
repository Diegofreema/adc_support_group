/** Where a member votes. State, LGA, ward and name come from the INEC unit list. */
export interface VotingArea {
  state: string
  lga: string
  ward: string
  pollingUnitCode: string
  pollingUnitName: string
}

/** The picker's choices so far (state → LGA → ward → unit code). */
export interface VotingAreaChoice {
  state: string
  lga: string
  ward: string
  code: string
}

export const EMPTY_CHOICE: VotingAreaChoice = { state: '', lga: '', ward: '', code: '' }
