import { Check } from 'lucide-react'

import { ActionBar } from '@/components/layout/ActionBar'
import { Banner, Button } from '@/components/shared'
import { DuesSettingsFields } from '../components/DuesSettingsFields'
import { SummaryGate } from '../components/SummaryGate'
import { useDuesSettings } from '../hooks/use-dues-settings'
import type { MoneySummary } from '../types'

export function DuesSettingsPage() {
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Dues settings</h1>
      <SummaryGate>{(summary) => (summary.canSetDues ? <DuesSettingsForm summary={summary} /> : <Banner tone="info" className="mt-5">Only the leader or treasurer sets dues.</Banner>)}</SummaryGate>
    </div>
  )
}

function DuesSettingsForm({ summary }: { summary: MoneySummary }) {
  const { form, submit, isSaving } = useDuesSettings(summary.dues)
  return (
    <form className="mt-5" onSubmit={submit} noValidate>
      <DuesSettingsFields form={form} />
      <ActionBar>
        <Button type="submit" variant="primary" size="lg" block icon={Check} disabled={isSaving}>{isSaving ? 'Saving…' : 'Save'}</Button>
      </ActionBar>
    </form>
  )
}
