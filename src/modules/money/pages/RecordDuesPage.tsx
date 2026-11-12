import { getRouteApi } from '@tanstack/react-router'
import { Check } from 'lucide-react'

import { ActionBar } from '@/components/layout/ActionBar'
import { Button } from '@/components/shared'
import { DuesOffNote } from '../components/DuesOffNote'
import { DuesTotal } from '../components/DuesTotal'
import { RecordDuesFields } from '../components/RecordDuesFields'
import { SummaryGate } from '../components/SummaryGate'
import { useRecordDues } from '../hooks/use-record-dues'
import type { DuesInfo, DuesPeriod, MoneySummary } from '../types'
import { periodRange } from '../utils/periods'

const routeApi = getRouteApi('/_app/money/dues/new')

type ActiveDues = DuesInfo & { period: DuesPeriod; currentPeriod: string }

const isActive = (dues: DuesInfo): dues is ActiveDues => dues.enabled && Boolean(dues.period && dues.currentPeriod)

export function RecordDuesPage() {
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Record dues</h1>
      <SummaryGate>{(summary) => <RecordDues summary={summary} />}</SummaryGate>
    </div>
  )
}

function RecordDues({ summary }: { summary: MoneySummary }) {
  if (!isActive(summary.dues)) return <DuesOffNote canSetDues={summary.canSetDues} />
  return <RecordDuesForm dues={summary.dues} />
}

function RecordDuesForm({ dues }: { dues: ActiveDues }) {
  const search = routeApi.useSearch()
  const prefill = { member: search.member && search.name ? { id: search.member, name: search.name } : undefined, period: search.period }
  const { form, fromPeriod, periods, total, submit, isSaving } = useRecordDues(dues, prefill)
  const covers = periodRange(fromPeriod || dues.currentPeriod, dues.period, periods)
  return (
    <form className="mt-5" onSubmit={submit} noValidate>
      <RecordDuesFields form={form} dues={dues} />
      <DuesTotal total={total} covers={covers} />
      <ActionBar>
        <Button type="submit" variant="primary" size="lg" block icon={Check} disabled={isSaving}>{isSaving ? 'Saving…' : 'Save'}</Button>
      </ActionBar>
    </form>
  )
}
