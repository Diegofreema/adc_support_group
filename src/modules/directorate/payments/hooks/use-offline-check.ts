import { useState } from 'react'

import { useOfflineDecisions } from './use-payments'
import { useReasonForm } from '../../shared/hooks/use-reason-form'
import { reasonMessage } from '../../shared/utils/reasons'
import { OFFLINE_REJECT_REASONS } from '../utils/labels'
import type { Payment } from '@/types/domain'

type Mode = 'check' | 'reject'

/** Open one offline payment, then confirm it or reject with a reason. */
export function useOfflineCheck() {
  const [payment, setPayment] = useState<Payment | null>(null)
  const [mode, setMode] = useState<Mode>('check')
  const form = useReasonForm()
  const { confirm, reject } = useOfflineDecisions()
  const close = () => { setPayment(null); setMode('check'); form.reset() }
  const confirmPayment = () => payment && confirm.mutate(payment.id, { onSuccess: close })
  const rejectPayment = () => payment && reject.mutate({ id: payment.id, reason: reasonMessage(OFFLINE_REJECT_REASONS, form.value) }, { onSuccess: close })
  return { payment, mode, open: setPayment, close, startReject: () => setMode('reject'), form, confirmPayment, rejectPayment }
}

export type OfflineCheck = ReturnType<typeof useOfflineCheck>
