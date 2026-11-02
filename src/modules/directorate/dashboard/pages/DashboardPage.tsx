import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'

import { PageHeader, SectionTitle, StatGrid, buttonClassName } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { CategoriesCard } from '../components/CategoriesCard'
import { PeriodSelect } from '../components/PeriodSelect'
import { StatesSection } from '../components/StatesSection'
import { TodoList } from '../components/TodoList'
import { TopGroupsCard } from '../components/TopGroupsCard'
import { useDashboard } from '../hooks/use-dashboard'
import { headlineStats } from '../utils/stats'
import type { Dashboard, Period } from '../types'

export function DashboardPage() {
  const { period, setPeriod, dashboard } = useDashboard()
  return (
    <>
      <PageHeader title="Overview" actions={<HeaderActions period={period} onPeriod={setPeriod} />} />
      {dashboard && <DashboardBody dashboard={dashboard} />}
    </>
  )
}

function HeaderActions({ period, onPeriod }: { period: Period; onPeriod: (value: Period) => void }) {
  return (
    <>
      <PeriodSelect value={period} onChange={onPeriod} />
      <Link to="/admin/reports" className={buttonClassName('primary', 'sm')}><Download className="i i-sm" aria-hidden />Export</Link>
    </>
  )
}

function DashboardBody({ dashboard }: { dashboard: Dashboard }) {
  return (
    <>
      <StatGrid stats={headlineStats(dashboard.totals)} />
      <div className="mt-6">
        <SplitLayout
          main={<><SectionTitle title="To do" className="mt-0" /><TodoList todo={dashboard.todo} /><StatesSection rows={dashboard.states} /></>}
          side={<><TopGroupsCard groups={dashboard.topGroups} /><CategoriesCard categories={dashboard.categories} /></>}
        />
      </div>
    </>
  )
}
