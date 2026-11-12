import { invokeFunction } from '@/lib/edge-functions'
import { rpc, supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { Cause, CauseStatus, Payment, PaymentMethod, PaymentPurpose, PaymentStatus } from '@/types/domain'
import type {
  ActivityOption, ChapterOption, FunzCheckout, OfflinePaymentInput, PayDraft, PayerOption, PaymentCheck,
} from '../types'

/** private.support_group_payment_json */
interface PaymentJson {
  id: string
  group_id: string
  group_name: string
  chapter_name: string | null
  cause_id: string | null
  cause_title: string | null
  purpose: string | null
  note: string | null
  amount: number | string
  method: PaymentMethod
  status: PaymentStatus
  reference: string
  paid_on: string | null
  payer_name: string | null
  recorded_by_name: string | null
  activity_id: string | null
  activity_title: string | null
  rejection_reason: string | null
  created_at: string
}

function toPurpose(json: PaymentJson): PaymentPurpose {
  if (json.cause_id) return { kind: 'cause', causeId: json.cause_id, causeTitle: json.cause_title ?? 'Cause' }
  return { kind: 'general', purpose: json.purpose ?? 'other', note: json.note ?? undefined }
}

function toPayment(json: PaymentJson): Payment {
  return {
    id: json.id,
    groupId: json.group_id,
    groupName: json.group_name,
    chapterName: json.chapter_name ?? undefined,
    purpose: toPurpose(json),
    amount: Number(json.amount),
    method: json.method,
    status: json.status,
    // Offline payments carry the day they were paid; online ones when they started.
    date: json.paid_on ? `${json.paid_on}T12:00:00` : json.created_at,
    reference: json.reference,
    payerName: json.payer_name ?? json.recorded_by_name ?? '—',
    activityId: json.activity_id ?? undefined,
    activityTitle: json.activity_title ?? undefined,
    rejectionReason: json.rejection_reason ?? undefined,
  }
}

const PAGE = 100

/** Leader: every payment of the group. Member: the ones they paid or recorded. Newest first. */
export async function listPayments(_groupId: string): Promise<Payment[]> {
  const payments: Payment[] = []
  for (let offset = 0; ; offset += PAGE) {
    const page = await rpc<{ total: number; rows: PaymentJson[] }>('get_support_group_payments', { p_limit: PAGE, p_offset: offset })
    payments.push(...page.rows.map(toPayment))
    if (payments.length >= page.total || page.rows.length === 0) return payments
  }
}

export async function getPayment(id: string): Promise<Payment> {
  return toPayment(await rpc<PaymentJson>('get_support_group_payment', { p_payment_id: id }))
}

interface CauseJson {
  id: string
  title: string
  description: string | null
  target: number | string
  raised: number | string
  deadline: string | null
  status: CauseStatus
}

/** Open causes the caller's group can give to. */
export async function listOpenCauses(): Promise<Cause[]> {
  const causes = await rpc<CauseJson[]>('get_support_group_causes')
  return causes.map((cause) => ({
    id: cause.id,
    title: cause.title,
    description: cause.description ?? undefined,
    target: Number(cause.target),
    raised: Number(cause.raised),
    deadline: cause.deadline ?? '',
    groupsCount: 0,
    status: cause.status,
    visibleTo: '',
  }))
}

/** A group still waiting for the Directorate has no chapters yet. */
export async function listChapters(): Promise<ChapterOption[]> {
  const chapters = await rpc<{ id: string; name: string }[]>('get_support_group_chapters').catch((error: Error) => {
    if (/not been verified/.test(error.message)) return []
    throw error
  })
  return chapters.map((chapter) => ({ id: chapter.id, name: chapter.name }))
}

/** Recent approved activities a payment can be linked to. */
export async function listActivityOptions(): Promise<ActivityOption[]> {
  const { rows } = await rpc<{ rows: { id: string; title: string; occurred_on: string }[] }>(
    'get_support_group_activities', { p_status: 'approved', p_limit: 50 },
  )
  return rows.map((row) => ({ id: row.id, title: row.title, date: `${row.occurred_on}T12:00:00` }))
}

const ROSTER_PAGE = 500

/** Members the leader can name as the payer (get_support_group_roster is leader only). */
export async function listPayerOptions(): Promise<PayerOption[]> {
  const payers: PayerOption[] = []
  for (let offset = 0; ; offset += ROSTER_PAGE) {
    const page = await rpc<{ total: number; rows: { profile_id: string; full_name: string }[] }>(
      'get_support_group_roster', { p_limit: ROSTER_PAGE, p_offset: offset },
    )
    payers.push(...page.rows.map((row) => ({ id: row.profile_id, name: row.full_name })))
    if (payers.length >= page.total || page.rows.length === 0) return payers
  }
}

/** Create the Funz checkout. The caller sends the browser to paymentUrl. */
export async function startFunzPayment(draft: PayDraft): Promise<FunzCheckout> {
  const target = draft.payFor === 'cause' && draft.causeId
    ? { causeId: draft.causeId }
    : { purpose: draft.purpose, note: draft.note.trim() || undefined }
  const result = await invokeFunction<{ payment_id: string; reference: string; payment_url: string }>(
    'initiate-group-payment',
    { amount: draft.amount, ...target, activityId: draft.activityId },
  )
  return { paymentId: result.payment_id, reference: result.reference, paymentUrl: result.payment_url }
}

/** Ask Funz (via verify-group-payment) how a returning payer's payment went. */
export function verifyFunzPayment(reference: string): Promise<PaymentCheck> {
  return invokeFunction<PaymentCheck>('verify-group-payment', { reference })
}

const PROOF_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' }
const MAX_PROOF_BYTES = 10 * 1024 * 1024

/** Upload the receipt to the private proofs bucket; returns its storage path. */
async function uploadProof(groupId: string, file: File): Promise<string> {
  const ext = PROOF_TYPES[file.type]
  if (!ext) throw new Error('Proof must be a photo (JPG, PNG, WebP) or a PDF')
  if (file.size > MAX_PROOF_BYTES) throw new Error('Proof must be under 10 MB')
  const path = `${groupId}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('support-group-payment-proofs').upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw new Error(`Could not upload the proof: ${error.message}`)
  return path
}

function offlineTarget(forId: string): { p_cause_id: string | null; p_purpose: string | null } {
  return forId.startsWith('purpose:')
    ? { p_cause_id: null, p_purpose: forId.slice('purpose:'.length) }
    : { p_cause_id: forId, p_purpose: null }
}

/** Leader records a transfer or cash payment; it waits for a Directorate check. */
export async function reportOfflinePayment(input: OfflinePaymentInput): Promise<Payment> {
  const groupId = sessionStore.getUser()?.activeGroupId
  if (!groupId) throw new Error('You are not in a group')
  const proofPath = await uploadProof(groupId, input.proof)
  return toPayment(await rpc<PaymentJson>('record_support_group_offline_payment', {
    p_amount: input.amount,
    p_method: input.method,
    p_paid_on: input.date,
    p_proof_path: proofPath,
    p_payer_profile_id: input.payerId || null,
    ...offlineTarget(input.forId),
    p_reference: input.reference?.trim() || null,
    p_chapter_id: input.chapterId || null,
  }))
}
