import { queryOptions } from '@tanstack/react-query'

import { BASE_TOTALS, CAUSE_TOTALS, PAYMENTS } from './payments.mock'
import { directorateKeys } from '../../shared/query-keys'
import { notFound, respond } from '@/lib/mock-api'
import type { Payment } from '@/types/domain'

const db: Payment[] = structuredClone(PAYMENTS)

function findPayment(id: string): Payment {
  return db.find((payment) => payment.id === id) ?? notFound('Payment', id)
}

export const paymentsQuery = queryOptions({ queryKey: directorateKeys.payments(), queryFn: () => respond(db) })

export const causeTotalsQuery = queryOptions({ queryKey: [...directorateKeys.payments(), 'by-cause'], queryFn: () => respond(CAUSE_TOTALS) })

export const baseTotalsQuery = queryOptions({ queryKey: [...directorateKeys.payments(), 'totals'], queryFn: () => respond(BASE_TOTALS) })

/** Staff saw the proof: the offline payment now counts. */
export async function confirmOfflinePayment(id: string): Promise<Payment> {
  return respond(Object.assign(findPayment(id), { status: 'paid' as const }))
}

export async function rejectOfflinePayment(id: string, reason: string): Promise<Payment> {
  return respond(Object.assign(findPayment(id), { status: 'rejected' as const, rejectionReason: reason }))
}
