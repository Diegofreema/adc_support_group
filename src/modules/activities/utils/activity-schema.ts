import { z } from 'zod'

/** Step 2 of "Record activity". */
export const activityDetailsSchema = z.object({
  title: z.string().trim().min(3, 'Add a short title'),
  date: z.string().min(1, 'Pick a date'),
  peopleReached: z.string().regex(/^[1-9]\d*$/, 'How many people?'),
  state: z.string().min(1, 'Pick a state'),
  lga: z.string().min(1, 'Pick an LGA'),
  ward: z.string().min(1, 'Pick a ward'),
  note: z.string().trim().max(300).optional(),
})

export type ActivityDetailsForm = z.infer<typeof activityDetailsSchema>
