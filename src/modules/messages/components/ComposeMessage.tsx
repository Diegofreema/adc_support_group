import { SplitLayout } from '@/components/layout/SplitLayout'
import { useBuyPointsDialog } from '../hooks/use-buy-points'
import { useComposeMessage } from '../hooks/use-compose-message'
import { AudiencePicker } from './AudiencePicker'
import { BuyPointsDialog } from './BuyPointsDialog'
import { ChannelPicker } from './ChannelPicker'
import { ComposeAction } from './ComposeAction'
import { MessageField } from './MessageField'
import { PointsBalanceCard } from './PointsBalanceCard'

/** The "New" tab: form + points card + buy dialog. */
export function ComposeMessage() {
  const compose = useComposeMessage()
  const buy = useBuyPointsDialog()
  const form = (
    <form onSubmit={(event) => { event.preventDefault(); compose.submit() }}>
      <AudiencePicker audiences={compose.audiences} value={compose.audience} onChange={compose.setAudience} />
      <ChannelPicker value={compose.channel} onChange={compose.setChannel} cost={compose.cost} balance={compose.balance} />
      <MessageField value={compose.body} onChange={compose.setBody} pages={compose.cost.pages} />
      <ComposeAction needsPoints={compose.needsPoints} busy={compose.isSending} onSend={compose.submit} onBuy={buy.dialog.open} />
    </form>
  )
  return (
    <>
      <SplitLayout main={form} side={<PointsBalanceCard balance={compose.balance} onBuy={buy.dialog.open} />} />
      <BuyPointsDialog open={buy.dialog.isOpen} onOpenChange={buy.dialog.setOpen} packId={buy.packId} onPackChange={buy.setPackId} onConfirm={buy.confirm} busy={buy.isBuying} />
    </>
  )
}
