import { PageHeader, SectionTitle } from '@/components/shared'
import { ChapterFilter } from '../components/ChapterFilter'
import { PaymentHistory } from '../components/PaymentHistory'
import { PaymentsActions } from '../components/PaymentsActions'
import { PaymentTotalsRow } from '../components/PaymentTotalsRow'
import { usePaymentHistory } from '../hooks/use-payment-history'

export function PaymentsPage() {
  const view = usePaymentHistory()
  return (
    <>
      <PageHeader title="Payments" actions={<PaymentsActions />} />
      <PaymentTotalsRow totals={view.totals} />
      <SectionTitle title="History" action={<ChapterFilter chapters={view.chapters} value={view.chapter} onChange={view.setChapter} />} />
      <PaymentHistory payments={view.history} />
    </>
  )
}
