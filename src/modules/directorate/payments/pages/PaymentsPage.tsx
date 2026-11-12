import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { useState } from 'react'

import { PageHeader, StatGrid, buttonClassName } from '@/components/shared'
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

export function PaymentsPage() {
  const [tab, setTab] = useState<PaymentsTab>('to-confirm')
  const overview = usePaymentsOverview()
  const check = useOfflineCheck()
  const overLimit = useOverLimitPayments()
  return (
    <>
      <PageHeader title="Payments" actions={<Link to="/admin/reports" className={buttonClassName('secondary', 'sm')}><Download className="i i-sm" aria-hidden />Export</Link>} />
      {overview.totals && <StatGrid stats={paymentStats(overview.totals)} />}
      <div className="mt-6"><PaymentsTabs value={tab} waiting={overview.waiting.length} overLimit={overLimit.total} onChange={setTab} /></div>
      <div className="mt-4">
        {tab === 'to-confirm' && <OfflineQueue payments={overview.waiting} onCheck={check.open} />}
        {tab === 'all' && <><PaymentsTable payments={overview.payments} /><Pager paging={overview.paging} total={overview.paymentCount} /></>}
        {tab === 'over-limit' && <><OverLimitList payments={overLimit.rows} limit={overLimit.limit} /><Pager paging={overLimit.paging} total={overLimit.total} /></>}
        {tab === 'by-cause' && <CauseTotalsList causes={overview.causes} />}
      </div>
      <OfflineCheckModal check={check} />
    </>
  )
}
