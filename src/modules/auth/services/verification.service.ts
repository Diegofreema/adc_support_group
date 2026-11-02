import { delay } from '@/lib/mock-api'

/** Mock SMS one-time codes. Real version: Supabase phone OTP via Termii/Bunce. */
export async function sendCode(phone: string): Promise<{ sentTo: string }> {
  await delay(400)
  return { sentTo: phone }
}

export async function verifyCode(code: string): Promise<void> {
  await delay(400)
  if (code === '000000') throw new Error('Wrong code')
}

export async function requestPasswordReset(identifier: string): Promise<{ sentTo: string }> {
  await delay(400)
  return { sentTo: identifier }
}
