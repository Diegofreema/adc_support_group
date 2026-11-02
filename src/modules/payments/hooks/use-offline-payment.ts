import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { offlinePaymentSchema, type OfflinePaymentForm } from '../utils/offline-schema'
import { parseAmount } from '../utils/amount'
import { usePayLookups } from './use-pay-lookups'
import { useReportOfflinePayment } from './use-pay-mutation'
import { notify } from '@/lib/toast'

const today = () => new Date().toISOString().slice(0, 10)

/** "Paid offline" form: validation, lookups and submit. */
export function useOfflinePayment() {
  const navigate = useNavigate()
  const lookups = usePayLookups()
  const report = useReportOfflinePayment()
  const form = useForm<OfflinePaymentForm>({
    resolver: zodResolver(offlinePaymentSchema),
    defaultValues: { forId: '', payerId: 'group', amount: '', date: today(), method: 'transfer', reference: '', proofName: '' },
  })

  const onValid = (values: OfflinePaymentForm) =>
    report.mutate({ ...values, amount: parseAmount(values.amount) }, {
      onSuccess: () => { notify('Sent for check'); void navigate({ to: '/payments' }) },
    })

  return { form, lookups, submit: form.handleSubmit(onValid), isSending: report.isPending }
}
