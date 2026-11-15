import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useWatch } from 'react-hook-form'

import { offlinePaymentSchema, PAYER_UNCHOSEN, type OfflinePaymentForm } from '../utils/offline-schema'
import { parseAmount } from '../utils/amount'
import { useGivingCheck } from './use-giving-check'
import { usePayLookups } from './use-pay-lookups'
import { useReportOfflinePayment } from './use-pay-mutation'
import { notify } from '@/lib/toast'
import { useRequiredUser } from '@/stores/session-store'
import { useAppForm } from '@/hooks/use-app-form'

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
  const report = useReportOfflinePayment()
  const form = useAppForm<OfflinePaymentForm>({
    resolver: zodResolver(offlinePaymentSchema),
    defaultValues: { forId: '', chapterId: '', payerId: '', amount: '', date: today(), method: 'transfer', reference: '' },
  })

  const [payerField, amountField] = useWatch({ control: form.control, name: ['payerId', 'amount'] })
  const payerId = payerField && payerField !== PAYER_UNCHOSEN ? payerField : undefined
  const giving = useGivingCheck(parseAmount(amountField), payerId)

  const onValid = (values: OfflinePaymentForm) =>
    report.mutate({ ...values, amount: parseAmount(values.amount) }, {
      onSuccess: () => { notify('Sent for check'); void navigate({ to: '/payments' }) },
    })

  return { form, lookups, leaderName: user.fullName, giving, givingForSomeoneElse: Boolean(payerId), submit: form.handleSubmit(onValid), isSending: report.isPending }
}
