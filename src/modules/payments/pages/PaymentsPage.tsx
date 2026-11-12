import { PageHeader, SectionTitle, SkeletonList, SkeletonStats } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { ChapterFilter } from '../components/ChapterFilter'
import { PaymentHistory } from '../components/PaymentHistory'
import { PaymentsActions } from '../components/PaymentsActions'
import { PaymentTotalsRow } from '../components/PaymentTotalsRow'
import { usePaymentHistory } from '../hooks/use-payment-history'

export function PaymentsPage() {
  const view = usePaymentHistory()
  const locked = useGroupLocked()
  return (
    <>
      <PageHeader title="Payments" actions={<PaymentsActions canRecordOffline={view.canRecordOffline} locked={locked} />} />
      {view.isLoading ? <SkeletonStats count={3} /> : <PaymentTotalsRow totals={view.totals} />}
      <SectionTitle title="History" action={<ChapterFilter chapters={view.chapters} value={view.chapter} onChange={view.setChapter} />} />
      {view.isLoading ? <SkeletonList /> : <PaymentHistory payments={view.history} />}
    </>
  )
}
