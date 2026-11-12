import { DuesOffNote } from '../components/DuesOffNote'
import { DuesStatusFilters } from '../components/DuesStatusFilters'
import { DuesStatusList } from '../components/DuesStatusList'
import { ErrorState, LoadMoreButton, SkeletonList } from '@/components/shared'
import { PeriodStepper } from '../components/PeriodStepper'
import { SummaryGate } from '../components/SummaryGate'
import { useDuesStatus } from '../hooks/use-dues-status'
import type { DuesPeriod, MoneySummary } from '../types'
import { periodLabel } from '../utils/periods'

export function DuesStatusPage() {
  return (
    <>
      <h1 className="h1">Dues paid</h1>
      <SummaryGate>{(summary) => <DuesStatusGate summary={summary} />}</SummaryGate>
    </>
  )
}

function DuesStatusGate({ summary }: { summary: MoneySummary }) {
  const { dues } = summary
  if (!dues.enabled || !dues.period || !dues.currentPeriod) return <DuesOffNote canSetDues={summary.canSetDues} />
  return <DuesStatus current={dues.currentPeriod} period={dues.period} startOn={dues.startOn} />
}

function DuesStatus({ current, period, startOn }: { current: string; period: DuesPeriod; startOn?: string }) {
  const view = useDuesStatus(current, period, startOn)
  return (
    <>
      <div className="mt-5"><PeriodStepper label={view.label ?? periodLabel(view.period, period)} canGoBack={view.canGoBack} onBack={view.goBack} onNext={view.goNext} /></div>
      {view.counts && <p className="muted text-center mt-1">{view.counts.paid} of {view.counts.members} paid</p>}
      <div className="mt-5"><DuesStatusFilters filter={view.filter} onFilter={view.setFilter} search={view.search} onSearch={view.setSearch} /></div>
      <div className="mt-4">
        {view.isLoading ? <SkeletonList /> : view.error ? <ErrorState title="Could not load the list" error={view.error} onRetry={view.retry} /> : <DuesStatusList people={view.people} period={view.period} />}
      </div>
      <LoadMoreButton hasMore={view.hasMore} loading={view.isLoadingMore} onClick={view.loadMore} />
    </>
  )
}
