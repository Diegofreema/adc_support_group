import { z } from 'zod'

export const staffFormSchema = z.object({
  fullName: z.string().trim().min(3, 'Enter their name'),
  contact: z.string().trim().min(6, 'Enter a phone or email'),
})

export type StaffFormValues = z.infer<typeof staffFormSchema>

export function cleanName(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}
