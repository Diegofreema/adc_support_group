import { Send } from 'lucide-react'

import { Banner, Button } from '@/components/shared'
import { ActionBar } from '@/components/layout/ActionBar'
import { OfflinePaymentFields } from '../components/OfflinePaymentFields'
import { useOfflinePayment } from '../hooks/use-offline-payment'

export function OfflinePaymentPage() {
  const { form, lookups, submit, isSending } = useOfflinePayment()
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Paid offline</h1>
      <Banner tone="info" className="mt-4">Counts after staff check.</Banner>
      <form className="mt-5" onSubmit={submit} noValidate>
        <OfflinePaymentFields form={form} causes={lookups.causes} chapters={lookups.chapters} />
        <ActionBar>
          <Button type="submit" variant="primary" size="lg" block icon={Send} disabled={isSending}>Send</Button>
        </ActionBar>
      </form>
    </div>
  )
}
