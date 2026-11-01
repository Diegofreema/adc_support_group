import { z } from 'zod'

import { MIN_PASSWORD_LENGTH } from './password-rules'
import { isValidPhone } from '@/lib/phone'

/** Validation rules for auth forms. Components never validate by hand. */

const phone = z.string().trim().refine(isValidPhone, 'Enter a valid phone number')
const newPassword = z.string().min(MIN_PASSWORD_LENGTH, `${MIN_PASSWORD_LENGTH}+ characters`).regex(/\d/, 'Add a number')
const required = (message: string) => z.string().trim().min(1, message)

export const loginSchema = z
  .object({
    method: z.enum(['phone', 'email']),
    identifier: z.string().trim(),
    password: z.string().min(4, 'Enter your password'),
  })
  .superRefine((values, ctx) => {
    const valid = values.method === 'phone' ? isValidPhone(values.identifier) : z.email().safeParse(values.identifier).success
    if (!valid) ctx.addIssue({ code: 'custom', path: ['identifier'], message: values.method === 'phone' ? 'Enter a valid phone number' : 'Enter a valid email' })
  })
export type LoginValues = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({ identifier: required('Enter your phone or email') })
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export const joinSchema = z.object({
  phone,
  code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
  fullName: required('Enter your name'),
  state: required('Choose your state'),
  lga: required('Choose your LGA'),
  ward: required('Choose your ward'),
  password: newPassword,
  email: z.union([z.email('Enter a valid email'), z.literal('')]),
  gender: z.string(),
  ageRange: z.string(),
  occupation: z.string(),
  pollingUnit: z.string(),
})
export type JoinValues = z.infer<typeof joinSchema>

export const registerGroupSchema = z
  .object({
    fullName: required('Enter your name'),
    phone,
    code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code'),
    password: newPassword,
    groupName: z.string().trim().min(3, 'Enter the group name'),
    category: required('Pick a category'),
    about: z.string(),
    location: z.enum(['nigeria', 'abroad']),
    level: z.enum(['national', 'state', 'lga', 'ward']),
    state: z.string(),
    lga: z.string(),
    ward: z.string(),
    country: z.string(),
    city: z.string(),
    leaderTitle: required('Enter your title'),
    photoName: z.string(),
    cacNumber: z.string(),
    confirmed: z.boolean().refine(Boolean, 'Please confirm'),
  })
  .superRefine(validatePlace)
export type RegisterGroupValues = z.infer<typeof registerGroupSchema>

type PlaceCheck = Pick<RegisterGroupValues, 'location' | 'level' | 'state' | 'lga' | 'ward' | 'country' | 'city'>

/** Which location fields are required depends on where the group is based. */
function validatePlace(values: PlaceCheck, ctx: z.RefinementCtx): void {
  const missing = missingPlaceFields(values)
  missing.forEach((field) => ctx.addIssue({ code: 'custom', path: [field], message: 'Required' }))
}

export function missingPlaceFields(values: PlaceCheck): (keyof PlaceCheck)[] {
  if (values.location === 'abroad') return (['country', 'city'] as const).filter((field) => !values[field].trim())
  const needed: (keyof PlaceCheck)[] = values.level === 'national' ? [] : ['state']
  if (values.level === 'lga' || values.level === 'ward') needed.push('lga')
  if (values.level === 'ward') needed.push('ward')
  return needed.filter((field) => !values[field].trim())
}

export const setPasswordSchema = z
  .object({ password: newPassword, repeat: z.string(), show: z.boolean() })
  .refine((values) => values.password === values.repeat, { path: ['repeat'], message: "Passwords don't match" })
export type SetPasswordValues = z.infer<typeof setPasswordSchema>
