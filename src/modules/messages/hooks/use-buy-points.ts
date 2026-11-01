import { useState } from 'react'

import { useBuyPoints as useBuyPointsMutation } from './use-messages'
import { SMS_PACKS } from '../utils/sms-packs'
import { useDisclosure } from '@/hooks/use-disclosure'
import { notify } from '@/lib/toast'

/** "Buy SMS points" dialog state + purchase. */
export function useBuyPointsDialog() {
  const dialog = useDisclosure()
  const buy = useBuyPointsMutation()
  const [packId, setPackId] = useState(SMS_PACKS[1]!.id)

  const confirm = () =>
    buy.mutate(packId, { onSuccess: () => { dialog.close(); notify('Points added') } })

  return { dialog, packId, setPackId, confirm, isBuying: buy.isPending }
}
