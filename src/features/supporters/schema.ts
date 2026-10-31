import { z } from 'zod'

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
] as const

export const supporterFormSchema = z.object({
  fullName: z.string().trim().min(3, 'Enter your full name'),
  email: z.email('Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .regex(/^(\+234|0)[789][01]\d{8}$/, 'Enter a valid Nigerian phone number, e.g. 08031234567'),
  state: z.enum(NIGERIAN_STATES, { error: 'Select your state' }),
  lga: z.string().trim().min(2, 'Enter your local government area'),
  message: z.string().trim().max(500, 'Keep it under 500 characters').optional(),
})

export type SupporterFormValues = z.infer<typeof supporterFormSchema>

export type Supporter = SupporterFormValues & {
  id: string
  joinedAt: string
}
