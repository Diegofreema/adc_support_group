import { z } from 'zod'

import { parseAmount } from './amount'
import { CATEGORY_LABELS } from './labels'

const PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_PROOF_BYTES = 10 * 1024 * 1024
const MAX_AMOUNT = 100_000_000

const proofFile = (missing: string) =>
  z
    .custom<File>((value) => value instanceof File, missing)
    .refine((file) => PROOF_TYPES.includes(file.type), 'Use a photo (JPG, PNG, WebP) or a PDF')
    .refine((file) => file.size <= MAX_PROOF_BYTES, 'Must be under 10 MB')

const amount = (min: number) =>
  z.string().refine((value) => {
    const naira = parseAmount(value)
    return naira >= min && naira <= MAX_AMOUNT
  }, `Enter at least ₦${min}`)

const description = z.string().trim().min(3, 'Say what it was').max(300, 'Keep it under 300 letters')

const member = z.object({ id: z.string(), name: z.string() }).nullable()

export const duesSettingsSchema = z
  .object({
    enabled: z.boolean(),
    amount: z.string(),
    period: z.enum(['month', 'quarter', 'year']),
    startOn: z.string(),
  })
  .superRefine((values, ctx) => {
    if (!values.enabled) return
    if (parseAmount(values.amount) < 50) ctx.addIssue({ code: 'custom', path: ['amount'], message: 'Enter at least ₦50' })
    if (!values.startOn) ctx.addIssue({ code: 'custom', path: ['startOn'], message: 'Pick the first period' })
  })

export const recordDuesSchema = z.object({
  member: member.refine((value) => Boolean(value), 'Pick the member'),
  fromPeriod: z.string().min(1, 'Pick the first period'),
  periods: z.number().int().min(1, 'At least 1').max(12, 'At most 12 at a time'),
  paidOn: z.string().min(1, 'Pick the date'),
  proof: proofFile('Add proof of payment'),
  note: z.string().trim().max(300, 'Keep it under 300 letters').optional(),
})

export const incomeSchema = z.object({
  amount: amount(1),
  occurredOn: z.string().min(1, 'Pick the date'),
  description: description.min(3, 'Say where the money came from'),
  member,
  proof: proofFile('Add proof').optional(),
})

export const expenseSchema = z.object({
  amount: amount(1),
  occurredOn: z.string().min(1, 'Pick the date'),
  category: z.string().refine((value) => value in CATEGORY_LABELS, 'Pick what it was for'),
  description,
  receipt: proofFile('Add the receipt'),
})

export type DuesSettingsForm = z.infer<typeof duesSettingsSchema>
export type RecordDuesForm = z.infer<typeof recordDuesSchema>
export type IncomeForm = z.infer<typeof incomeSchema>
export type ExpenseForm = z.infer<typeof expenseSchema>
