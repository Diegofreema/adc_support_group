import { HandCoins, Landmark, X, type LucideIcon } from 'lucide-react'

import type { Tone } from '@/components/shared'
import { formatDay } from '@/lib/format'
import type { Payment } from '@/types/domain'

export function isOffline(payment: Payment): boolean {
  return payment.method !== 'funz'
}

/** Did this payment go through? */
export function isSettled(payment: Payment): boolean {
  return payment.status === 'paid'
}

function statusNote(payment: Payment): string | undefined {
  if (payment.status === 'failed') return 'Failed at Funz'
  if (payment.status === 'rejected') return payment.rejectionReason
  return undefined
}

/** "28 Oct · Offline · Kano" */
export function paymentMeta(payment: Payment): string {
  const who = payment.chapterName ?? 'Whole group'
  const parts = [formatDay(payment.date), isOffline(payment) && 'Offline', statusNote(payment) ?? who]
  return parts.filter(Boolean).join(' · ')
}

export function paymentIcon(payment: Payment): LucideIcon {
  if (payment.status === 'failed') return X
  return isOffline(payment) ? Landmark : HandCoins
}

export function paymentTone(payment: Payment): Tone {
  if (payment.status === 'failed' || payment.status === 'rejected') return 'red'
  return payment.status === 'checking' ? 'amber' : 'green'
}

const METHOD_LABEL: Record<Payment['method'], string> = { funz: 'Funz', transfer: 'Bank transfer', cash: 'Cash' }

export function methodLabel(payment: Payment): string {
  return METHOD_LABEL[payment.method]
}
