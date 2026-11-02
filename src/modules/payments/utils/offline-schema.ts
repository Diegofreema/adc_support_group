import { z } from 'zod'

export const offlinePaymentSchema = z.object({
  forId: z.string().min(1, 'What was it for?'),
  payerId: z.string().min(1, 'Who paid?'),
  amount: z.string().refine((value) => Number(value.replace(/\D/g, '')) >= 100, 'Enter the amount'),
  date: z.string().min(1, 'Pick the date'),
  method: z.enum(['transfer', 'cash']),
  reference: z.string().trim().optional(),
  proofName: z.string().min(1, 'Add proof'),
})

export type OfflinePaymentForm = z.infer<typeof offlinePaymentSchema>
