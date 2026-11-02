import { useState } from 'react'

import { filterByChapter, paymentTotals } from '../utils/payment-totals'
import { useChapterOptions, usePayments } from './use-payments'
import { useRequiredUser } from '@/stores/session-store'

/** Payments screen view-model: totals, chapter filter, filtered history. */
export function usePaymentHistory() {
  const user = useRequiredUser()
  const payments = usePayments(user.activeGroupId ?? '').data ?? []
  const chapters = useChapterOptions().data ?? []
  const [chapter, setChapter] = useState('')
  return {
    totals: paymentTotals(payments),
    chapters,
    chapter,
    setChapter,
    history: filterByChapter(payments, chapter),
  }
}
