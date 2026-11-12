import { PageHeader } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { ExportBuilderCard } from '../components/ExportBuilderCard'
import { RecentExports } from '../components/RecentExports'
import { ReportTotals } from '../components/ReportTotals'
import { useExportBuilder, useReportTotals } from '../hooks/use-exports'

export function ReportsPage() {
  const builder = useExportBuilder()
  const totals = useReportTotals(builder.spec.period)
  return (
    <>
      <PageHeader title="Reports" />
      {totals && <ReportTotals totals={totals} />}
      <SplitLayout main={<ExportBuilderCard builder={builder} />} side={<RecentExports />} />
    </>
  )
}
