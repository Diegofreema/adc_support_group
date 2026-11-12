import { useState } from 'react'

import type { SegmentOption, TabItem } from '@/components/shared'
import type { BoardMeasure, BoardScope } from '../types/leaderboard.types'
import { useBoard } from './use-board'

const MEASURES: SegmentOption<BoardMeasure>[] = [
  { value: 'activities', label: 'Most activities' },
  { value: 'people', label: 'Most people reached' },
]

/** View-model for /leaderboard: tab (state or category), measure, and that board. */
export function useLeaderboard() {
  const [scope, setScope] = useState<BoardScope>('state')
  const [measure, setMeasure] = useState<BoardMeasure>('activities')
  const stateBoard = useBoard('state', measure)
  const categoryBoard = useBoard('category', measure)
  const current = scope === 'state' ? stateBoard : categoryBoard
  const tabs: TabItem<BoardScope>[] = [
    { value: 'state', label: stateBoard.data?.boardName ?? 'My state' },
    { value: 'category', label: categoryBoard.data?.boardName ?? 'My category' },
  ]
  return {
    scope, setScope, measure, setMeasure, tabs, measures: MEASURES,
    board: current.data,
    isLoading: current.isLoading,
    error: current.error,
    retry: () => void current.refetch(),
  }
}
