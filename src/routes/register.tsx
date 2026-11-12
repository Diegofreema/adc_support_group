import { createFileRoute, redirect } from '@tanstack/react-router'

import { RegisterGroupPage } from '@/modules/auth/pages/RegisterGroupPage'
import { sessionStore } from '@/stores/session-store'

interface RegisterSearch {
  /** Edit the leader's pending (or resubmit their rejected) group. */
  edit?: boolean
}

export const Route = createFileRoute('/register')({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
    edit: search.edit === true || search.edit === 'true' || search.edit === 1 || search.edit === '1' ? true : undefined,
  }),
  // Signed in: only someone with no group registers, and only a waiting leader edits.
  beforeLoad: ({ search }) => {
    const user = sessionStore.getUser()
    if (!user) return
    if (user.role === 'directorate') throw redirect({ to: '/admin' })
    const waiting = user.role === 'leader' && (user.activeGroupStatus === 'pending' || user.activeGroupStatus === 'rejected')
    if (search.edit ? !waiting : Boolean(user.activeGroupId)) throw redirect({ to: '/home' })
  },
  component: RegisterGroupPage,
})
