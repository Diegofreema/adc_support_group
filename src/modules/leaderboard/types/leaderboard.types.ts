/** Which board: the group's state (or Abroad / National) or its category. */
export type BoardScope = 'state' | 'category'

/** What the board ranks by. Money is never a measure. */
export type BoardMeasure = 'activities' | 'people'

/** One ranked group. Tied groups share a place. */
export interface BoardRow {
  groupId: string
  name: string
  photoUrl?: string
  state: string
  category?: string
  activities: number
  people: number
  place: number
  isMine: boolean
}

/** One board as the caller sees it: top rows plus their own group's place. */
export interface Board {
  /** 'YYYY-MM-DD' of the daily snapshot; missing before the first one. */
  snapshotOn?: string
  scope: BoardScope
  measure: BoardMeasure
  /** The state name, "Abroad", "National" or the category name. */
  boardName?: string
  groupCount: number
  /** Missing when the group isn't ranked on this board. */
  mine?: BoardRow
  rows: BoardRow[]
}
