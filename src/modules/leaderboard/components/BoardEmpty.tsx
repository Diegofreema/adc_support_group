import { Trophy } from 'lucide-react'

import { EmptyState } from '@/components/shared'
import type { BoardScope } from '../types/leaderboard.types'

const TITLES: Record<BoardScope, string> = {
  state: 'Your group will show here after the next morning update.',
  category: 'Your group is not on a category board yet. Ask your leader to choose a category.',
}

/** The group isn't ranked on this board (new group, or no category). */
export function BoardEmpty({ scope }: { scope: BoardScope }) {
  return <EmptyState icon={Trophy} title={TITLES[scope]} />
}
