import { login } from './auth.service'
import { completePasswordReset } from './verification.service'
import type { User } from '@/types/domain'

export interface NewPasswordInput {
  phone: string
  challengeId: string
  code: string
  password: string
}

/**
 * Set a new password with the code sent to the phone, then sign in with it.
 * Used by "Forgot password" and by members a leader imported (they never got
 * a password of their own).
 */
export async function setPassword(input: NewPasswordInput): Promise<User> {
  await completePasswordReset(input)
  return login({ identifier: input.phone, password: input.password })
}
