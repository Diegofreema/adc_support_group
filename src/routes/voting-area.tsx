import { createFileRoute, redirect } from '@tanstack/react-router'

import { safeRedirectPath } from '@/lib/route-guards'
import { VotingAreaPage } from '@/modules/voting-area'
import { sessionStore } from '@/stores/session-store'

interface VotingAreaSearch {
  /** Where to go once it's saved. */
  redirect?: string
}

/** Members without a polling unit come here before anything else (see requireVotingArea). */
export const Route = createFileRoute('/voting-area')({
  validateSearch: (search: Record<string, unknown>): VotingAreaSearch => ({ redirect: safeRedirectPath(search.redirect) }),
  beforeLoad: ({ search }) => {
    const user = sessionStore.getUser()
    if (!user) throw redirect({ to: '/', search: { redirect: '/voting-area' } })
    if (user.role === 'directorate') throw redirect({ to: '/admin' })
    if (user.needsVotingArea) return
    if (search.redirect) throw redirect({ href: search.redirect })
    throw redirect({ to: '/home' })
  },
  component: VotingAreaPage,
})
