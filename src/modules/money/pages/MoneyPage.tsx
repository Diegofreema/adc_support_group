import { PageHeader } from '@/components/shared'
import { BalanceCard } from '../components/BalanceCard'
import { CampaignGivingCard } from '../components/CampaignGivingCard'
import { MoneyActions } from '../components/MoneyActions'
import { MoneyTotals } from '../components/MoneyTotals'
import { MyDuesCard } from '../components/MyDuesCard'
import { RecordsSection } from '../components/RecordsSection'
import { SummaryGate } from '../components/SummaryGate'
import type { MoneySummary } from '../types'

export function MoneyPage() {
  return (
    <>
      <PageHeader title="Group money" />
      <SummaryGate>{(summary) => <Money summary={summary} />}</SummaryGate>
    </>
  )
}

function Money({ summary }: { summary: MoneySummary }) {
  return (
    <>
      <BalanceCard balance={summary.balance} />
      <div className="mt-4"><MoneyTotals summary={summary} /></div>
      <CampaignGivingCard amount={summary.givenToCampaign} />
      <MyDuesCard dues={summary.dues} />
      <MoneyActions summary={summary} />
      {summary.canSeeEntries && <RecordsSection canVoid={summary.canManage} />}
    </>
  )
}
