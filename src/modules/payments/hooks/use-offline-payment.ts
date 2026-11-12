import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { offlinePaymentSchema, type OfflinePaymentForm } from '../utils/offline-schema'
import { parseAmount } from '../utils/amount'
import { usePayLookups } from './use-pay-lookups'
import { useReportOfflinePayment } from './use-pay-mutation'
import { usePayerOptions } from './use-payments'
import { notify } from '@/lib/toast'
import { hasPower } from '@/lib/permissions'
import { useRequiredUser } from '@/stores/session-store'

/** Local calendar day. */
const today = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

/** "Paid offline" form (money power): validation, lookups and submit. */
export function useOfflinePayment() {
  const navigate = useNavigate()
  const user = useRequiredUser()
  const lookups = usePayLookups()
  const payers = usePayerOptions(hasPower(user, 'money')).data ?? []
  const report = useReportOfflinePayment()
  const form = useForm<OfflinePaymentForm>({
    resolver: zodResolver(offlinePaymentSchema),
    defaultValues: { forId: '', chapterId: '', payerId: '', amount: '', date: today(), method: 'transfer', reference: '' },
  })

  const onValid = (values: OfflinePaymentForm) =>
    report.mutate({ ...values, amount: parseAmount(values.amount) }, {
      onSuccess: () => { notify('Sent for check'); void navigate({ to: '/payments' }) },
    })

  return { form, lookups, payers, leaderName: user.fullName, submit: form.handleSubmit(onValid), isSending: report.isPending }
}
