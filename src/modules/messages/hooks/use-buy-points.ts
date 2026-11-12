import { useState } from 'react'

import { useBuyPoints as useBuyPointsMutation } from './use-messages'
import { SMS_PACKS } from '../utils/sms-packs'
import { useDisclosure } from '@/hooks/use-disclosure'

/** "Buy SMS points" dialog state + purchase (redirects to Funz to pay). */
export function useBuyPointsDialog() {
  const dialog = useDisclosure()
  const buy = useBuyPointsMutation()
  const [packId, setPackId] = useState(SMS_PACKS[1]!.id)

  const confirm = () =>
    buy.mutate(packId, { onSuccess: (paymentUrl) => window.location.assign(paymentUrl) })

  // Stay "busy" after success: the page is about to leave for Funz.
  return { dialog, packId, setPackId, confirm, isBuying: buy.isPending || buy.isSuccess }
}
