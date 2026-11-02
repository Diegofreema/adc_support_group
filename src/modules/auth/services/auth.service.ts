import { DEMO_USERS } from './auth.mock'
import { normalisePhone } from '@/lib/phone'
import { delay } from '@/lib/mock-api'
import { sessionStore } from '@/stores/session-store'
import type { User } from '@/types/domain'

export interface Credentials {
  /** Phone number or email. */
  identifier: string
  password: string
}

function findDemoUser(identifier: string): User {
  const phone = normalisePhone(identifier)
  const match = DEMO_USERS.find((user) => user.phone === phone || user.email === identifier.trim().toLowerCase())
  // Demo: unknown numbers log in as the leader account.
  return match ?? DEMO_USERS[0]!
}

/** Mock login. Real version: Supabase phone/email + password auth. */
export async function login({ identifier, password }: Credentials): Promise<User> {
  await delay(500)
  if (password.length < 4) throw new Error('Wrong phone or password')
  const user = findDemoUser(identifier)
  sessionStore.setUser(user)
  return user
}

export function logout(): void {
  sessionStore.setUser(null)
}

/** Where each role lands after logging in. */
export function homePathFor(user: User): string {
  return user.role === 'directorate' ? '/admin' : '/home'
}
