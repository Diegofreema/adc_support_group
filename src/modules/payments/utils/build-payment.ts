import type { Cause, Payment, PaymentPurpose, User } from '@/types/domain'
import type { ChapterOption, OfflinePaymentInput, PayDraft } from '../types'

function causePurpose(causes: Cause[], causeId: string): PaymentPurpose {
  const cause = causes.find((candidate) => candidate.id === causeId)
  return { kind: 'cause', causeId, causeTitle: cause?.title ?? 'Cause' }
}

export function draftPurpose(draft: PayDraft, causes: Cause[]): PaymentPurpose {
  if (draft.payFor === 'cause' && draft.causeId) return causePurpose(causes, draft.causeId)
  return { kind: 'general', purpose: draft.purpose, note: draft.note || undefined }
}

/** "general" or a cause id → purpose. */
export function offlinePurpose(forId: string, causes: Cause[]): PaymentPurpose {
  return forId === 'general' ? { kind: 'general', purpose: 'other' } : causePurpose(causes, forId)
}

export function chapterName(chapters: ChapterOption[], id: string | undefined): string | undefined {
  return chapters.find((chapter) => chapter.id === id)?.name
}

/** Fields every new payment shares. */
export function paymentBase(user: User, id: string): Pick<Payment, 'id' | 'groupId' | 'groupName' | 'payerName' | 'date'> {
  return { id, groupId: user.activeGroupId ?? '', groupName: user.activeGroupName ?? '', payerName: user.fullName, date: new Date().toISOString() }
}

export function offlineReference(input: OfflinePaymentInput): string {
  return input.reference?.trim() || `${input.method.toUpperCase()}-${Date.now().toString().slice(-5)}`
}
