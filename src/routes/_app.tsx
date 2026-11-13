import { createFileRoute } from '@tanstack/react-router'

import { AppShell } from '@/components/layout/AppShell'
import { RouteError } from '@/components/layout/RouteError'
import { requireRole, requireVotingArea } from '@/lib/route-guards'

const requireMember = requireRole(['leader', 'member'])

/** Leaders, executives, coordinators and members, once they've said where they vote. */
export const Route = createFileRoute('/_app')({
  beforeLoad: (context) => {
    requireMember(context)
    requireVotingArea(context)
  },
  component: AppShell,
  errorComponent: RouteError,
})
