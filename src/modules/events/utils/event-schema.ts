import { z } from 'zod'

import { fromLocalInputs, isTooLate } from './event-time'

/** The new / edit event form. Times are local "HH:MM" on the chosen date. */
export const eventFormSchema = z.object({
  type: z.string().min(1, 'Pick a type'),
  title: z.string().trim().min(3, 'Add a short title'),
  date: z.string().min(1, 'Pick a date'),
  startTime: z.string().min(1, 'Pick a time'),
  endTime: z.string(),
  venue: z.string().trim().min(2, 'Where is it?'),
  state: z.string().min(1, 'Pick a state'),
  lga: z.string().min(1, 'Pick an LGA'),
  ward: z.string().min(1, 'Pick a ward'),
  /** Chapter id, or "" for the whole group. */
  chapterId: z.string(),
  note: z.string().trim().max(500, 'Keep it short'),
})
  .refine((values) => !values.endTime || values.endTime > values.startTime, { path: ['endTime'], message: 'The end must be after the start' })
  .refine((values) => !values.date || !values.startTime || !isTooLate(fromLocalInputs(values.date, values.startTime)), { path: ['startTime'], message: 'This time has passed' })

export type EventForm = z.infer<typeof eventFormSchema>

/** "Make it an activity". Numbers stay strings in the inputs. */
export const recordFormSchema = z.object({
  guests: z.string().regex(/^\d*$/, 'Numbers only'),
  peopleReached: z.string().regex(/^[1-9]\d*$/, 'How many people?'),
  note: z.string().trim().max(300, 'Keep it short'),
})

export type RecordForm = z.infer<typeof recordFormSchema>

/** "" → 0 */
export const toCount = (value: string) => Number(value) || 0
