import { Coins, Send } from 'lucide-react'

import { Button } from '@/components/shared'
import { ActionBar } from '@/components/layout/ActionBar'

interface ComposeActionProps {
  needsPoints: boolean
  busy: boolean
  onSend: () => void
  onBuy: () => void
}

/** Send, or "Buy points" when SMS would cost more than the balance. */
export function ComposeAction({ needsPoints, busy, onSend, onBuy }: ComposeActionProps) {
  return (
    <ActionBar>
      {needsPoints
        ? <Button variant="primary" size="lg" block icon={Coins} onClick={onBuy}>Buy points</Button>
        : <Button variant="primary" size="lg" block icon={Send} onClick={onSend} disabled={busy}>Send</Button>}
    </ActionBar>
  )
}
