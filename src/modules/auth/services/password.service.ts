import { DEMO_USERS } from './auth.mock'
import { delay } from '@/lib/mock-api'
import { sessionStore } from '@/stores/session-store'

/**
 * Replace the temporary password an imported member got by SMS/email.
 * Mock: signs in the demo member so the flow lands on their home.
 */
export async function setPassword(password: string): Promise<void> {
  await delay(500)
  if (!password) throw new Error('Password required')
  if (!sessionStore.getUser()) sessionStore.setUser(DEMO_USERS[1]!)
}
