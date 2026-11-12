import { createFileRoute, redirect } from '@tanstack/react-router'

import { redirectIfLoggedIn, safeRedirectPath } from '@/lib/route-guards'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { sessionStore } from '@/stores/session-store'

interface LoginSearch {
  /** Internal path to return to after logging in (e.g. /join/<code>). */
  redirect?: string
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({ redirect: safeRedirectPath(search.redirect) }),
  beforeLoad: ({ search }) => {
    if (search.redirect && sessionStore.getUser()) throw redirect({ href: search.redirect })
    redirectIfLoggedIn()
  },
  component: LoginPage,
})
