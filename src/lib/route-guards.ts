import { redirect } from '@tanstack/react-router'

import { sessionStore } from '@/stores/session-store'
import type { Role } from '@/types/domain'

/** beforeLoad guard: must be logged in with one of these roles. */
export function requireRole(roles: Role[]) {
  return () => {
    const user = sessionStore.getUser()
    if (!user) throw redirect({ to: '/' })
    if (!roles.includes(user.role)) throw redirect({ to: user.role === 'directorate' ? '/admin' : '/home' })
  }
}

/** beforeLoad guard for public pages: logged-in users skip login. */
export function redirectIfLoggedIn() {
  const user = sessionStore.getUser()
  if (user) throw redirect({ to: user.role === 'directorate' ? '/admin' : '/home' })
}
