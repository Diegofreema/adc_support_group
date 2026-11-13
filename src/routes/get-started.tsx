import { createFileRoute, redirect } from '@tanstack/react-router'

import { GetStartedPage } from '@/modules/auth/pages/GetStartedPage'
import { sessionStore } from '@/stores/session-store'

/** Signed in, polling unit picked, no group yet: join or start one before the app. */
export const Route = createFileRoute('/get-started')({
  beforeLoad: () => {
    const user = sessionStore.getUser()
    if (!user) throw redirect({ to: '/', search: { redirect: '/get-started' } })
    if (user.role === 'directorate') throw redirect({ to: '/admin' })
    if (user.needsVotingArea) throw redirect({ to: '/voting-area', search: { redirect: '/get-started' } })
    if (user.activeGroupId) throw redirect({ to: '/home' })
  },
  component: GetStartedPage,
})
