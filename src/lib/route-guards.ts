import { redirect } from '@tanstack/react-router'

import { sessionStore } from '@/stores/session-store'
import { hasPower } from './permissions'
import type { Power, Role, User } from '@/types/domain'

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

/**
 * beforeLoad guard: a verified group and this power (Members, Money, Messages
 * screens). Without it → /home. The backend refuses anyway; this avoids a dead page.
 */
export function requirePower(power: Power) {
  return () => {
    requireVerifiedGroup()
    const user = sessionStore.getUser()
    if (user && !hasPower(user, power)) throw redirect({ to: '/home' })
  }
}

const PROBE_ORIGIN = 'https://adc.invalid'

/**
 * Only internal paths ("/join/abc"), never "//evil.com", "https://…", or a
 * path with backslashes or control characters that a browser may normalise
 * into another origin.
 */
export function safeRedirectPath(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return undefined
  // eslint-disable-next-line no-control-regex -- rejecting control characters is the point
  if (/[\\\u0000-\u001f\u007f]/.test(value)) return undefined
  try {
    return new URL(value, PROBE_ORIGIN).origin === PROBE_ORIGIN ? value : undefined
  } catch {
    return undefined
  }
}
