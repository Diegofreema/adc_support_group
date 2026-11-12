import { redirect } from '@tanstack/react-router'

import { sessionStore } from '@/stores/session-store'
import type { Role, User } from '@/types/domain'

function homeFor(user: User): string {
  return user.role === 'directorate' ? '/admin' : '/home'
}

/** beforeLoad guard: must be logged in with one of these roles. Logged out → login, then back here. */
export function requireRole(roles: Role[]) {
  return ({ location }: { location: { href: string } }) => {
    const user = sessionStore.getUser()
    if (!user) throw redirect({ to: '/', search: { redirect: safeRedirectPath(location.href) } })
    if (!roles.includes(user.role)) throw redirect({ to: homeFor(user) })
  }
}

/** beforeLoad guard for public pages: logged-in users skip login. */
export function redirectIfLoggedIn() {
  const user = sessionStore.getUser()
  if (user) throw redirect({ to: homeFor(user) })
}

/** beforeLoad guard: pages about "my group" need one. /home explains what to do otherwise. */
export function requireGroup() {
  const user = sessionStore.getUser()
  if (user && !user.activeGroupId) throw redirect({ to: '/home' })
}

/**
 * beforeLoad guard: inviting, members, chapters, payments, messages and
 * activities only work once the Directorate has verified the group (the
 * backend refuses otherwise). Pending, rejected, suspended or no group → /home.
 */
export function requireVerifiedGroup() {
  const user = sessionStore.getUser()
  if (user && user.activeGroupStatus !== 'verified') throw redirect({ to: '/home' })
}

/** Only internal paths ("/join/abc"), never "//evil.com" or "https://…". */
export function safeRedirectPath(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  return value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\') ? value : undefined
}
