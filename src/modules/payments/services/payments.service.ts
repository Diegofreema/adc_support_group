import { ACTIVITY_OPTIONS, CAUSES, CHAPTERS, PAYMENTS } from './payments.mock'
import { chapterName, draftPurpose, offlinePurpose, offlineReference, paymentBase } from '../utils/build-payment'
import { newId, notFound, respond } from '@/lib/mock-api'
import type { Cause, Payment, User } from '@/types/domain'
import type { ActivityOption, ChapterOption, OfflinePaymentInput, PayDraft } from '../types'

export async function listPayments(groupId: string): Promise<Payment[]> {
  return respond(PAYMENTS.filter((payment) => payment.groupId === groupId))
}

export async function getPayment(id: string): Promise<Payment> {
  return respond(PAYMENTS.find((payment) => payment.id === id) ?? notFound('Payment', id))
}

export async function listOpenCauses(): Promise<Cause[]> {
  return respond(CAUSES.filter((cause) => cause.status === 'open'))
}

export async function listChapters(): Promise<ChapterOption[]> {
  return respond(CHAPTERS)
}

export async function listActivityOptions(): Promise<ActivityOption[]> {
  return respond(ACTIVITY_OPTIONS)
}

function addCauseAmount({ purpose, amount }: Payment): void {
  if (purpose.kind !== 'cause') return
  const cause = CAUSES.find((candidate) => candidate.id === purpose.causeId)
  if (cause) cause.raised += amount
}

/** Mock Funz checkout: always succeeds. Real version redirects to Funz and verifies by webhook. */
export async function payWithFunz(draft: PayDraft, user: User): Promise<Payment> {
  const id = newId('pay')
  const payment: Payment = {
    ...paymentBase(user, id),
    chapterName: draft.payer === 'chapter' ? chapterName(CHAPTERS, draft.chapterId) : undefined,
    purpose: draftPurpose(draft, CAUSES),
    amount: draft.amount,
    method: 'funz',
    status: 'paid',
    reference: `FZ-${new Date().getFullYear()}-${id.slice(-6).toUpperCase()}`,
    activityId: draft.activityId,
    activityTitle: ACTIVITY_OPTIONS.find((activity) => activity.id === draft.activityId)?.title,
  }
  PAYMENTS.unshift(payment)
  addCauseAmount(payment)
  return respond(payment, 900)
}

/** Offline payments wait for a Directorate check. */
export async function reportOfflinePayment(input: OfflinePaymentInput, user: User): Promise<Payment> {
  const payment: Payment = {
    ...paymentBase(user, newId('pay')),
    chapterName: chapterName(CHAPTERS, input.payerId),
    purpose: offlinePurpose(input.forId, CAUSES),
    amount: input.amount,
    method: input.method,
    status: 'checking',
    date: new Date(input.date).toISOString(),
    reference: offlineReference(input),
  }
  PAYMENTS.unshift(payment)
  return respond(payment, 600)
}
