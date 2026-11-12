import { boardPhrase } from '../utils/board-text'
import { useBoard } from './use-board'

/** The caller's group's places on its state board. */
export interface MyStanding {
  /** "in Lagos", "among groups abroad", "among national groups". */
  boardPhrase: string
  activitiesPlace: number
  peoplePlace?: number
}

/** For Home: the group's place on its state board, or null when it isn't ranked (or not loaded yet). */
export function useMyStanding(): MyStanding | null {
  const activities = useBoard('state', 'activities').data
  const people = useBoard('state', 'people').data
  if (!activities?.mine || !activities.boardName) return null
  return {
    boardPhrase: boardPhrase(activities.boardName),
    activitiesPlace: activities.mine.place,
    peoplePlace: people?.mine?.place,
  }
}
