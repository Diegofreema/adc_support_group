import { z } from 'zod'

const PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

export const offlinePaymentSchema = z.object({
  forId: z.string().min(1, 'What was it for?'),
  chapterId: z.string(),
  payerId: z.string(),
  amount: z.string().refine((value) => {
    const amount = Number(value.replace(/\D/g, ''))
    return amount >= 100 && amount <= 10_000_000
  }, 'Enter between ₦100 and ₦10,000,000'),
  date: z.string().min(1, 'Pick the date'),
  method: z.enum(['transfer', 'cash']),
  reference: z.string().trim().optional(),
  proof: z
    .custom<File>((value) => value instanceof File, 'Add proof')
    .refine((file) => PROOF_TYPES.includes(file.type), 'Use a photo (JPG, PNG, WebP) or a PDF')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Proof must be under 10 MB'),
})

export type OfflinePaymentForm = z.infer<typeof offlinePaymentSchema>
