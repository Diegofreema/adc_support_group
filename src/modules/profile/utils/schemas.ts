import { z } from 'zod'

export const profileSchema = z.object({
  fullName: z.string().trim().min(3, 'Enter your name'),
  email: z.union([z.email('Enter a valid email'), z.literal('')]),
  state: z.string().min(1, 'Choose your state'),
  lga: z.string().min(1, 'Choose your LGA'),
  ward: z.string().min(1, 'Choose your ward'),
})
export type ProfileValues = z.infer<typeof profileSchema>

export const changePasswordSchema = z.object({
  current: z.string().min(1, 'Enter your current password'),
  next: z.string().min(8, '8+ characters').regex(/\d/, 'Add a number'),
})
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>

/** Form values from a loaded profile. */
export function toProfileValues(profile: { fullName: string; email: string; state: string; lga: string; ward: string }): ProfileValues {
  return { fullName: profile.fullName, email: profile.email, state: profile.state, lga: profile.lga, ward: profile.ward }
}
