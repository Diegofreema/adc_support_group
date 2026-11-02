import { z } from 'zod'

import type { Cause } from '@/types/domain'
import type { CauseFormValues, CauseInput } from '../types'

export const causeFormSchema = z.object({
  title: z.string().trim().min(3, 'Give it a name'),
  description: z.string().trim().max(120, 'Keep it short'),
  target: z.string().regex(/^\d{4,}$/, 'Enter an amount, e.g. 5000000'),
  deadline: z.string().min(1, 'Pick a last day'),
  visibleTo: z.string().min(1),
})

export const VISIBLE_TO_OPTIONS = ['All groups', 'North West', 'North East', 'North Central', 'South West', 'South East', 'South South'] as const

export const EMPTY_CAUSE: CauseFormValues = { title: '', description: '', target: '', deadline: '', visibleTo: 'All groups' }

export function toCauseInput(values: CauseFormValues): CauseInput {
  return { ...values, description: values.description || undefined, target: Number(values.target) }
}

export function toFormValues(cause: Cause): CauseFormValues {
  return { title: cause.title, description: cause.description ?? '', target: String(cause.target), deadline: cause.deadline, visibleTo: cause.visibleTo }
}
