import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { LeaderboardPage } from '@/modules/leaderboard/pages/LeaderboardPage'

export const Route = createFileRoute('/_app/leaderboard')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Leaderboard' },
  component: LeaderboardPage,
})
