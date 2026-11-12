import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().trim().min(3, 'Enter your name'),
  state: z.string().min(1, 'Choose your state'),
  lga: z.string().min(1, 'Choose your LGA'),
  ward: z.string().min(1, 'Choose your ward'),
})
export type ProfileValues = z.infer<typeof profileSchema>

/** Phone accounts change password with a texted code, not the current password. */
export const changePasswordSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
  next: z.string().min(8, '8+ characters').max(72, 'Keep it under 72 characters').regex(/\d/, 'Add a number'),
})
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>

/** Form values from a loaded profile. */
export function toProfileValues(profile: { fullName: string; state: string; lga: string; ward: string }): ProfileValues {
  return { fullName: profile.fullName, state: profile.state, lga: profile.lga, ward: profile.ward }
}

/** Email verification: the address, then the emailed code. */
export const emailSchema = z.object({ email: z.email('Enter a valid email') })
export const emailCodeSchema = z.object({ code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code') })
