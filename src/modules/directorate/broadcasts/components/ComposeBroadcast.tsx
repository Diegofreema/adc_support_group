import { Card } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useBroadcastComposer } from '../hooks/use-broadcast-composer'
import { AudienceFields } from './AudienceFields'
import { BuyPointsModal } from './BuyPointsModal'
import { ChannelPicker } from './ChannelPicker'
import { MessageField } from './MessageField'
import { PointsCard } from './PointsCard'
import { SendBroadcast } from './SendBroadcast'
import { SmsCostNote } from './SmsCostNote'

/** The "New" tab: form on the left, points on the right. */
export function ComposeBroadcast() {
  const composer = useBroadcastComposer()
  const buy = useDisclosure()
  return (
    <>
      <SplitLayout
        main={<Card><AudienceFields composer={composer} /><ChannelPicker composer={composer} /><MessageField composer={composer} /><SmsCostNote composer={composer} /><SendBroadcast composer={composer} /></Card>}
        side={<PointsCard balance={composer.balance} onBuy={buy.open} />}
      />
      <BuyPointsModal open={buy.isOpen} onOpenChange={buy.setOpen} />
    </>
  )
}
