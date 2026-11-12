import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { PageHeader, Skeleton, SkeletonList, SkeletonRegion, SkeletonStats, SkeletonTable, StatGrid, buttonClassName } from '@/components/shared'
import { Pager } from '../../shared/components/Pager'
import { CauseTotalsList } from '../components/CauseTotalsList'
import { OfflineCheckModal } from '../components/OfflineCheckModal'
import { OfflineQueue } from '../components/OfflineQueue'
import { OverLimitList } from '../components/OverLimitList'
import { PaymentsTable } from '../components/PaymentsTable'
import { PaymentsTabs } from '../components/PaymentsTabs'
import { useOfflineCheck } from '../hooks/use-offline-check'
import { useOverLimitPayments, usePaymentsOverview } from '../hooks/use-payments'
import { paymentStats } from '../utils/stats'
import type { PaymentsTab } from '../types'

type Overview = ReturnType<typeof usePaymentsOverview>
type OverLimit = ReturnType<typeof useOverLimitPayments>
type Check = ReturnType<typeof useOfflineCheck>

export function PaymentsPage() {
  const [tab, setTab] = useState<PaymentsTab>('to-confirm')
  const overview = usePaymentsOverview(tab)
  const check = useOfflineCheck()
  const overLimit = useOverLimitPayments()
  return (
    <>
      <PageHeader title="Payments" actions={<Link to="/admin/reports" className={buttonClassName('secondary', 'sm')}><Download className="i i-sm" aria-hidden />Export</Link>} />
      {overview.totals && <StatGrid stats={paymentStats(overview.totals)} />}
      {overview.totalsLoading && <SkeletonRegion label="Loading totals"><SkeletonStats count={4} /></SkeletonRegion>}
      <div className="mt-6"><PaymentsTabs value={tab} waiting={overview.waitingCount} all={overview.paymentCount} overLimit={overLimit.count} onChange={setTab} /></div>
      <div className="mt-4"><TabBody tab={tab} overview={overview} overLimit={overLimit} onCheck={check.open} /></div>
      <OfflineCheckModal check={check} />
    </>
  )
}

/** Skeleton, list or table for the open tab. */
function TabBody({ tab, overview, overLimit, onCheck }: { tab: PaymentsTab; overview: Overview; overLimit: OverLimit; onCheck: Check['open'] }) {
  if (tab === 'to-confirm') {
    return overview.waitingLoading ? <Loading><SkeletonList rows={4} /></Loading> : <OfflineQueue payments={overview.waiting} onCheck={onCheck} />
  }
  if (tab === 'all') {
    if (overview.paymentsLoading) return <Loading><SkeletonTable /></Loading>
    return <><PaymentsTable payments={overview.payments} /><Pager paging={overview.paging} total={overview.paymentCount ?? 0} /></>
  }
  if (tab === 'over-limit') {
    if (overLimit.isLoading) return <Loading><SkeletonTable /></Loading>
    return <><OverLimitList payments={overLimit.rows} limit={overLimit.limit} /><Pager paging={overLimit.paging} total={overLimit.total} /></>
  }
  return overview.causesLoading ? <Loading><CauseTotalsSkeleton /></Loading> : <CauseTotalsList causes={overview.causes} />
}

function Loading({ children }: { children: ReactNode }) {
  return <SkeletonRegion label="Loading payments">{children}</SkeletonRegion>
}

/** Cause cards: title, progress bar, amount. */
function CauseTotalsSkeleton() {
  return (
    <div className="grid-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="card skel-stack" style={{ gap: 12 }}>
          <span className="row-between"><Skeleton w="50%" h={16} /><Skeleton w={60} h={10} /></span>
          <Skeleton h={8} shape="round" />
          <Skeleton w="40%" h={12} />
        </div>
      ))}
    </div>
  )
}
