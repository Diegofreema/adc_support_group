import { Send } from 'lucide-react'

import { Banner, Button, PendingGroupNote } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { ActionBar } from '@/components/layout/ActionBar'
import { GivingLimitNote } from '../components/GivingLimitNote'
import { OfflinePaymentFields } from '../components/OfflinePaymentFields'
import { useOfflinePayment } from '../hooks/use-offline-payment'

export function OfflinePaymentPage() {
  const locked = useGroupLocked()
  if (locked) {
    return (
      <div className="main-narrow mx-auto">
        <h1 className="h1">Paid offline</h1>
        <PendingGroupNote className="mt-5" />
      </div>
    )
  }
  return <OfflinePaymentForm />
}

function OfflinePaymentForm() {
  const { form, lookups, payers, leaderName, giving, givingForSomeoneElse, submit, isSending } = useOfflinePayment()
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Paid offline</h1>
      <Banner tone="info" className="mt-4">Counts after staff check.</Banner>
      <form className="mt-5" onSubmit={submit} noValidate>
        <OfflinePaymentFields form={form} causes={lookups.causes} chapters={lookups.chapters} payers={payers} leaderName={leaderName} />
        <GivingLimitNote check={giving} forSomeoneElse={givingForSomeoneElse} className="mt-4" />
        <ActionBar>
          <Button type="submit" variant="primary" size="lg" block icon={Send} disabled={isSending}>Send</Button>
        </ActionBar>
      </form>
    </div>
  )
}
