import { Link } from '@tanstack/react-router'
import { Download } from 'lucide-react'

import {
  ErrorState, PageHeader, SectionTitle, SkeletonCard, SkeletonList, SkeletonRegion, SkeletonStats, SkeletonTable, StatGrid,
  buttonClassName,
} from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { SmsBudgetWarning } from '../../shared/components/SmsBudgetWarning'
import { CategoriesCard } from '../components/CategoriesCard'
import { PeriodSelect } from '../components/PeriodSelect'
import { StatesSection } from '../components/StatesSection'
import { TodoList } from '../components/TodoList'
import { TopGroupsCard } from '../components/TopGroupsCard'
import { useDashboard } from '../hooks/use-dashboard'
import { headlineStats } from '../utils/stats'
import type { Dashboard, Period } from '../types'

export function DashboardPage() {
  const { period, setPeriod, dashboard, error, retry } = useDashboard()
  return (
    <>
      <PageHeader title="Overview" actions={<HeaderActions period={period} onPeriod={setPeriod} />} />
      <SmsBudgetWarning className="mb-4" />
      {error && !dashboard && <ErrorState title="Could not load the overview" error={error} onRetry={retry} />}
      {!dashboard && !error && <DashboardSkeleton />}
      {dashboard && <DashboardBody dashboard={dashboard} />}
    </>
  )
}

function HeaderActions({ period, onPeriod }: { period: Period; onPeriod: (value: Period) => void }) {
  return (
    <>
      <PeriodSelect value={period} onChange={onPeriod} />
      {/* Secondary: the overview's job is the to-do list, not exporting. */}
      <Link to="/admin/reports" className={buttonClassName('secondary', 'sm')}><Download className="i i-sm" aria-hidden />Export</Link>
    </>
  )
}

function DashboardBody({ dashboard }: { dashboard: Dashboard }) {
  return (
    <>
      <StatGrid stats={headlineStats(dashboard.totals)} />
      <div className="mt-6">
        <SplitLayout
          main={<><SectionTitle title="Needs your attention" className="mt-0" /><TodoList todo={dashboard.todo} /><StatesSection rows={dashboard.states} /></>}
          side={<><TopGroupsCard groups={dashboard.topGroups} /><CategoriesCard categories={dashboard.categories} /></>}
        />
      </div>
    </>
  )
}

/** Stats, to-do rows, the state table and the two side cards, while the overview loads. */
function DashboardSkeleton() {
  return (
    <SkeletonRegion label="Loading the overview">
      <SkeletonStats count={4} />
      <div className="mt-6">
        <SplitLayout
          main={<><SectionTitle title="To do" className="mt-0" /><SkeletonList rows={4} /><SectionTitle title="By state" /><SkeletonTable rows={5} /></>}
          side={<><SkeletonCard lines={5} /><SkeletonCard lines={4} className="mt-4" /></>}
        />
      </div>
    </SkeletonRegion>
  )
}
