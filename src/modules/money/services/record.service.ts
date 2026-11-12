import { uploadProof } from '@/lib/proof-upload'
import { rpc } from '@/lib/supabase'
import type { RecordDuesInput, RecordExpenseInput, RecordIncomeInput } from '../types'

const FOLDER = 'money'

/** Treasurer records dues paid outside the app, with proof. One payment may cover several periods. */
export async function recordDues(input: RecordDuesInput): Promise<void> {
  const proofPath = await uploadProof(input.groupId, input.proof, FOLDER)
  await rpc('record_support_group_dues', {
    p_profile_id: input.profileId,
    p_from_period: input.fromPeriod,
    p_periods: input.periods,
    p_paid_on: input.paidOn,
    p_proof_path: proofPath,
    p_note: input.note?.trim() || null,
  })
}

/** Other money in: a gift, a sale, a refund. Proof and payer are optional. */
export async function recordIncome(input: RecordIncomeInput): Promise<void> {
  const proofPath = input.proof ? await uploadProof(input.groupId, input.proof, FOLDER) : null
  await rpc('record_support_group_income', {
    p_amount: input.amount,
    p_occurred_on: input.occurredOn,
    p_description: input.description.trim(),
    p_profile_id: input.profileId ?? null,
    p_proof_path: proofPath,
  })
}

/** Money spent, always with a receipt. */
export async function recordExpense(input: RecordExpenseInput): Promise<void> {
  const receiptPath = await uploadProof(input.groupId, input.receipt, FOLDER)
  await rpc('record_support_group_expense', {
    p_amount: input.amount,
    p_occurred_on: input.occurredOn,
    p_category: input.category,
    p_description: input.description.trim(),
    p_receipt_path: receiptPath,
  })
}
