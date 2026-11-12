import type { Session } from '@supabase/supabase-js'

import { installSession } from './auth.service'
import { invokeFunction } from '@/lib/edge-functions'

/**
 * Phone one-time codes. The code itself is checked server-side when the step
 * that needs it completes (account creation, password reset), not on its own.
 */

export interface Challenge {
  challengeId: string
  sentTo: string
}

interface ChallengeResponse {
  challenge_id: string
  phone: string
}

const toChallenge = (response: ChallengeResponse): Challenge => ({ challengeId: response.challenge_id, sentTo: response.phone })

/** Send a sign-up code. Refuses a phone that already has an account. */
export async function startSignup(fullName: string, phone: string): Promise<Challenge> {
  return toChallenge(await invokeFunction<ChallengeResponse>('auth-phone-signup-initiate', { fullName, phone }))
}

export interface SignupInput {
  challengeId: string
  code: string
  fullName: string
  phone: string
  password: string
  state?: string
  lga?: string
  ward?: string
  gender?: string
}

/** Create the account with the code and sign in. */
export async function completeSignup({ code, ...input }: SignupInput): Promise<void> {
  const { session } = await invokeFunction<{ session: Session }>('auth-phone-signup-complete', { ...input, otp: code })
  await installSession(session)
}

/** Send a password reset code to the phone on an account. */
export async function requestPasswordReset(phone: string): Promise<Challenge> {
  if (phone.includes('@')) throw new Error('Enter the phone number on your account')
  return toChallenge(await invokeFunction<ChallengeResponse>('auth-phone-password-reset-initiate', { phone }))
}

export async function completePasswordReset(input: { challengeId: string; code: string; phone: string; password: string }): Promise<void> {
  const { code, ...rest } = input
  await invokeFunction('auth-phone-password-reset-complete', { ...rest, otp: code })
}
