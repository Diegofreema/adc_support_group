import { z } from 'zod'

import { EVERYONE, visibilityFromKey, visibilityKey } from './visibility'
import type { CauseFormValues, CauseInput, DirectorateCause } from '../types'

export const causeFormSchema = z.object({
  title: z.string().trim().min(3, 'Give it a name'),
  description: z.string().trim().max(120, 'Keep it short'),
  target: z.string().regex(/^\d{4,}$/, 'Enter an amount, e.g. 5000000'),
  deadline: z.string().min(1, 'Pick a last day'),
  visibleTo: z.string().min(1),
})

export const EMPTY_CAUSE: CauseFormValues = { title: '', description: '', target: '', deadline: '', visibleTo: EVERYONE }

/** Form values → what the save RPC takes; "keep" keeps the cause's current audience. */
export function toCauseInput(values: CauseFormValues, current: DirectorateCause | null): CauseInput {
  const visibility = visibilityFromKey(values.visibleTo, { states: current?.visibleStates ?? [], categoryIds: current?.visibleCategoryIds ?? [] })
  return {
    title: values.title.trim(),
    description: values.description.trim() || undefined,
    target: Number(values.target),
    deadline: values.deadline,
    visibleStates: visibility.states,
    visibleCategoryIds: visibility.categoryIds,
  }
}

export function toFormValues(cause: DirectorateCause): CauseFormValues {
  return {
    title: cause.title,
    description: cause.description ?? '',
    target: String(cause.target),
    deadline: cause.deadline,
    visibleTo: visibilityKey({ states: cause.visibleStates, categoryIds: cause.visibleCategoryIds }),
  }
}
