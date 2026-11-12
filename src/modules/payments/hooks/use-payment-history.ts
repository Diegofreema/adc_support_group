import { useState } from 'react'

import { filterByChapter, paymentTotals } from '../utils/payment-totals'
import { useChapterOptions, usePayments } from './use-payments'
import { hasPower } from '@/lib/permissions'
import { useRequiredUser } from '@/stores/session-store'

/** Payments screen view-model: totals, chapter filter, filtered history. */
export function usePaymentHistory() {
  const user = useRequiredUser()
  const query = usePayments(user.activeGroupId ?? '')
  const payments = query.data ?? []
  const chapters = useChapterOptions().data ?? []
  const [chapter, setChapter] = useState('')
  return {
    isLoading: query.isLoading,
    canRecordOffline: hasPower(user, 'money'),
    totals: paymentTotals(payments),
    chapters,
    chapter,
    setChapter,
    history: filterByChapter(payments, chapter),
  }
}
