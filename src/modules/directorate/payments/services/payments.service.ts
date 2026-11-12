import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import type { Page } from '../../shared/services/paging'
import type { CauseTotal, ReviewPayment } from '../types'
import { rpc, supabase } from '@/lib/supabase'
import type { PaymentMethod, PaymentStatus } from '@/types/domain'

const PROOF_BUCKET = 'support-group-payment-proofs'

/** private.support_group_payment_json */
export interface PaymentJson {
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
  reference: string | null
  paid_on: string | null
  payer_name: string | null
  recorded_by_name: string | null
  activity_id: string | null
  activity_title: string | null
  proof_path: string | null
  rejection_reason: string | null
  created_at: string
}

interface PaymentPage {
  total: number
  total_paid: number | string
  rows: PaymentJson[]
}

const PURPOSE_LABEL: Record<string, string> = {
  mobilisation: 'Mobilisation', logistics: 'Logistics', media: 'Media', materials: 'Materials', other: 'Other',
}

export function toPayment(json: PaymentJson): ReviewPayment {
  return {
    id: json.id,
    groupId: json.group_id,
    groupName: json.group_name,
    chapterName: json.chapter_name ?? undefined,
    purpose: json.cause_id
      ? { kind: 'cause', causeId: json.cause_id, causeTitle: json.cause_title ?? 'Cause' }
      : { kind: 'general', purpose: PURPOSE_LABEL[json.purpose ?? ''] ?? 'General support', note: json.note ?? undefined },
    amount: Number(json.amount),
    method: json.method,
    status: json.status,
    date: json.paid_on ?? json.created_at,
    reference: json.reference ?? '',
    payerName: json.payer_name ?? json.recorded_by_name ?? '',
    activityId: json.activity_id ?? undefined,
    activityTitle: json.activity_title ?? undefined,
    rejectionReason: json.rejection_reason ?? undefined,
    proofPath: json.proof_path ?? undefined,
  }
}

export interface PaymentListArgs {
  status?: PaymentStatus
  method?: PaymentMethod
  causeId?: string
}

export function paymentListArgs(args: PaymentListArgs, limit: number, offset: number): Record<string, unknown> {
  return { p_status: args.status ?? null, p_method: args.method ?? null, p_cause_id: args.causeId ?? null, p_search: null, p_limit: limit, p_offset: offset }
}

function fetchPage(args: PaymentListArgs, limit: number, offset = 0): Promise<PaymentPage> {
  return rpc<PaymentPage>('get_admin_sg_payments', paymentListArgs(args, limit, offset))
}

/** One page of payments, most recent first, any status. */
async function fetchPayments(limit: number, offset: number): Promise<Page<ReviewPayment>> {
  const page = await fetchPage({}, limit, offset)
  return { total: Number(page.total), rows: page.rows.map(toPayment) }
}

/** Offline payments waiting for staff (Funz payments in "checking" settle themselves). */
async function fetchWaitingOffline(): Promise<ReviewPayment[]> {
  const page = await fetchPage({ status: 'checking' }, 500)
  return page.rows.filter((row) => row.method !== 'funz').map(toPayment)
}

export interface PaidTotals {
  raised: number
  paidCount: number
  funz: number
  funzCount: number
}

async function fetchPaidTotals(): Promise<PaidTotals> {
  const [paid, funz] = await Promise.all([fetchPage({ status: 'paid' }, 1), fetchPage({ status: 'paid', method: 'funz' }, 1)])
  return { raised: Number(paid.total_paid), paidCount: Number(paid.total), funz: Number(funz.total_paid), funzCount: Number(funz.total) }
}

interface CauseJson {
  id: string
  title: string
  target: number | string
  raised: number | string
  groups_count: number
}

async function fetchCauseTotals(): Promise<CauseTotal[]> {
  const causes = await rpc<CauseJson[]>('get_admin_sg_causes', { p_status: null })
  return causes.map((cause) => ({ causeId: cause.id, title: cause.title, raised: Number(cause.raised), target: Number(cause.target), groups: Number(cause.groups_count) }))
}

/** A short-lived link to the private proof image. */
async function fetchProofUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(PROOF_BUCKET).createSignedUrl(path, 10 * 60)
  if (error) throw new Error(error.message)
  return data.signedUrl
}

export const paymentsQuery = (limit: number, offset: number) =>
  queryOptions({ queryKey: [...directorateKeys.payments(), 'list', limit, offset], queryFn: () => fetchPayments(limit, offset) })

export const waitingOfflineQuery = queryOptions({ queryKey: [...directorateKeys.payments(), 'waiting'], queryFn: fetchWaitingOffline })

export const causeTotalsQuery = queryOptions({ queryKey: [...directorateKeys.payments(), 'by-cause'], queryFn: fetchCauseTotals })

export const paidTotalsQuery = queryOptions({ queryKey: [...directorateKeys.payments(), 'totals'], queryFn: fetchPaidTotals })

export const proofUrlQuery = (path: string) =>
  queryOptions({ queryKey: [...directorateKeys.payments(), 'proof', path], queryFn: () => fetchProofUrl(path), staleTime: 5 * 60_000 })

/** Staff saw the proof: the offline payment now counts. */
export async function confirmOfflinePayment(id: string): Promise<void> {
  await rpc('review_support_group_payment', { p_payment_id: id, p_approve: true, p_reason: null })
}

export async function rejectOfflinePayment(id: string, reason: string): Promise<void> {
  await rpc('review_support_group_payment', { p_payment_id: id, p_approve: false, p_reason: reason })
}
