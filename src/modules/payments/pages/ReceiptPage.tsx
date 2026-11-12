import { getRouteApi } from '@tanstack/react-router'

import { PageLoader } from '@/components/shared'
import { PaymentCheckBanner } from '../components/PaymentCheckBanner'
import { ReceiptActions } from '../components/ReceiptActions'
import { ReceiptCard } from '../components/ReceiptCard'
import { usePayment } from '../hooks/use-payments'
import { useReceiptActions } from '../hooks/use-receipt-actions'
import { useVerifyPayment } from '../hooks/use-verify-payment'

const routeApi = getRouteApi('/_app/payments/$paymentId')

/** Funz sends the payer back here with ?ref=<reference>. */
function useReturnReference(): string | undefined {
  return routeApi.useSearch().ref
}

export function ReceiptPage() {
  const { paymentId } = routeApi.useParams()
  const reference = useReturnReference()
  const { data: payment } = usePayment(paymentId)
  const check = useVerifyPayment(reference)
  const actions = useReceiptActions(payment)
  if (!payment) return <PageLoader />
  return (
    <div className="main-narrow mx-auto">
      {reference && <PaymentCheckBanner check={check.data} isChecking={check.isFetching} failed={check.isError} />}
      <ReceiptCard payment={payment} />
      <ReceiptActions onShare={actions.share} onDownload={actions.download} />
    </div>
  )
}
