import { PageHeader } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { ExportBuilderCard } from '../components/ExportBuilderCard'
import { RecentExports } from '../components/RecentExports'
import { useExportBuilder } from '../hooks/use-exports'

export function ReportsPage() {
  const builder = useExportBuilder()
  return (
    <>
      <PageHeader title="Reports" />
      <SplitLayout main={<ExportBuilderCard builder={builder} />} side={<RecentExports />} />
    </>
  )
}
