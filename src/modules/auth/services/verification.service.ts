import type { Session } from '@supabase/supabase-js'

import { installSession } from './auth.service'
import { invokeFunction } from '@/lib/edge-functions'
import { normalisePhone } from '@/lib/phone'

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

/** signup-initiate's refusal for a phone that already has an account. */
export function isExistingAccountError(error: Error): boolean {
  return /already exists/i.test(error.message)
}

/** Send a sign-up code. Refuses a phone that already has an account. */
export async function startSignup(fullName: string, phone: string): Promise<Challenge> {
  return toChallenge(await invokeFunction<ChallengeResponse>('auth-phone-signup-initiate', { fullName, phone: normalisePhone(phone) }))
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
  const { session } = await invokeFunction<{ session: Session }>('auth-phone-signup-complete', { ...input, phone: normalisePhone(input.phone), otp: code })
  await installSession(session)
}

export type CodeChannel = 'email' | 'sms'

/** Masked destinations, e.g. { email: 'a••••@x.com', sms: '•••• 4567' }. */
export type ChannelChoices = Record<CodeChannel, string>

interface ResetInitiateResponse extends Partial<ChallengeResponse> {
  needs_channel?: boolean
  channels?: ChannelChoices
}

/** Either the code went out, or the account has email and phone and the person must choose. */
export type ResetCodeResult =
  | { kind: 'sent'; challenge: Challenge; channel: CodeChannel }
  | { kind: 'choose'; channels: ChannelChoices }

/**
 * Send a password reset code for the account on this phone. An account with
 * only a phone gets an SMS; one with email and phone gets nothing until a
 * channel is given (ADC rule: the person chooses).
 */
export async function requestPasswordReset(phone: string, channel?: CodeChannel): Promise<ResetCodeResult> {
  if (phone.includes('@')) throw new Error('Enter the phone number on your account')
  const local = normalisePhone(phone)
  const response = await invokeFunction<ResetInitiateResponse>('auth-phone-password-reset-initiate', channel ? { phone: local, channel } : { phone: local })
  if (response.needs_channel && response.channels) return { kind: 'choose', channels: response.channels }
  if (!response.challenge_id || !response.phone) throw new Error('Something went wrong. Please try again.')
  return { kind: 'sent', challenge: toChallenge(response as ChallengeResponse), channel: channel ?? 'sms' }
}

export async function completePasswordReset(input: { challengeId: string; code: string; phone: string; password: string }): Promise<void> {
  const { code, ...rest } = input
  await invokeFunction('auth-phone-password-reset-complete', { ...rest, phone: normalisePhone(rest.phone), otp: code })
}
