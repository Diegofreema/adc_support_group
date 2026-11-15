import { Send } from 'lucide-react'

import { Button, PendingGroupNote } from '@/components/shared'
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
        <h1 className="h1">Record a cash or transfer payment</h1>
        <PendingGroupNote className="mt-5" />
      </div>
    )
  }
  return <OfflinePaymentForm />
}

function OfflinePaymentForm() {
  const { form, lookups, leaderName, giving, givingForSomeoneElse, submit, isSending } = useOfflinePayment()
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Record a cash or transfer payment</h1>
      <p className="muted mt-2">For money paid by bank transfer or cash. Staff check it first, then it counts.</p>
      <form className="mt-5" onSubmit={submit} noValidate>
        <OfflinePaymentFields form={form} causes={lookups.causes} chapters={lookups.chapters} leaderName={leaderName} />
        <GivingLimitNote check={giving} forSomeoneElse={givingForSomeoneElse} className="mt-4" />
        <ActionBar>
          <Button type="submit" variant="primary" size="lg" block icon={Send} loading={isSending}>{isSending ? 'Sending…' : 'Send for checking'}</Button>
        </ActionBar>
      </form>
    </div>
  )
}
