import { z } from 'zod'

import { isValidPhone } from '@/lib/phone'

export const newMemberSchema = z.object({
  fullName: z.string().trim().min(3, 'Enter their full name'),
  phone: z.string().refine(isValidPhone, 'Enter a valid phone number'),
  state: z.string().min(1, 'Choose a state'),
  lga: z.string().min(1, 'Choose an LGA'),
  ward: z.string().min(1, 'Choose a ward'),
  email: z.union([z.email('Enter a valid email'), z.literal('')]).optional(),
  chapterId: z.string().optional(),
})

export type NewMemberForm = z.infer<typeof newMemberSchema>

export const EMPTY_MEMBER: NewMemberForm = { fullName: '', phone: '', state: '', lga: '', ward: '', email: '', chapterId: '' }
