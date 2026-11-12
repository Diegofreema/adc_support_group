import { PageHeader, SkeletonRegion, SkeletonStats } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { DeparturesCard } from '../components/DeparturesCard'
import { LeaderboardSection } from '../components/LeaderboardSection'
import { ExportBuilderCard } from '../components/ExportBuilderCard'
import { RecentExports } from '../components/RecentExports'
import { ReportTotals } from '../components/ReportTotals'
import { useExportBuilder, useReportTotals } from '../hooks/use-exports'

export function ReportsPage() {
  const builder = useExportBuilder()
  const { totals, isLoading } = useReportTotals(builder.spec.period)
  return (
    <>
      <PageHeader title="Reports" />
      {totals && <ReportTotals totals={totals} />}
      {isLoading && <SkeletonRegion label="Loading totals" className="mb-6"><SkeletonStats count={4} /></SkeletonRegion>}
      <SplitLayout main={<ExportBuilderCard builder={builder} />} side={<RecentExports />} />
      <LeaderboardSection />
      <DeparturesCard />
    </>
  )
}
