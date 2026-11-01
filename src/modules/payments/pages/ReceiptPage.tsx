import { getRouteApi } from '@tanstack/react-router'

import { PageLoader } from '@/components/shared'
import { ReceiptActions } from '../components/ReceiptActions'
import { ReceiptCard } from '../components/ReceiptCard'
import { usePayment } from '../hooks/use-payments'
import { useReceiptActions } from '../hooks/use-receipt-actions'

const routeApi = getRouteApi('/_app/payments/$paymentId')

export function ReceiptPage() {
  const { paymentId } = routeApi.useParams()
  const { data: payment } = usePayment(paymentId)
  const actions = useReceiptActions(payment)
  if (!payment) return <PageLoader />
  return (
    <div className="main-narrow mx-auto">
      <ReceiptCard payment={payment} />
      <ReceiptActions onShare={actions.share} onDownload={actions.download} />
    </div>
  )
}
