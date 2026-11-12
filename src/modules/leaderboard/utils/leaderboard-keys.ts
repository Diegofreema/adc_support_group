import type { BoardMeasure, BoardScope } from '../types/leaderboard.types'

export const leaderboardKeys = {
  all: ['leaderboard'] as const,
  board: (groupId: string, scope: BoardScope, measure: BoardMeasure) => [...leaderboardKeys.all, groupId, scope, measure] as const,
}
