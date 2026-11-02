import { z } from 'zod'

import { isValidPhone } from '@/lib/phone'

export const newChapterSchema = z
  .object({
    level: z.enum(['state', 'lga', 'ward']),
    state: z.string().min(1, 'Choose a state'),
    lga: z.string(),
    ward: z.string(),
    name: z.string().trim().min(3, 'Enter a name'),
    coordinatorPhone: z.string().refine(isValidPhone, 'Enter a valid phone number'),
  })
  .refine((value) => value.level === 'state' || value.lga, { path: ['lga'], message: 'Choose an LGA' })
  .refine((value) => value.level !== 'ward' || value.ward, { path: ['ward'], message: 'Choose a ward' })

export type NewChapterForm = z.infer<typeof newChapterSchema>

export const EMPTY_CHAPTER: NewChapterForm = { level: 'state', state: '', lga: '', ward: '', name: '', coordinatorPhone: '' }
