import { Banner, Card } from '@/components/shared'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { useBroadcastComposer } from '../hooks/use-broadcast-composer'
import { AudienceFields } from './AudienceFields'
import { ChannelPicker } from './ChannelPicker'
import { MessageField } from './MessageField'
import { SendBroadcast } from './SendBroadcast'

/** The "New" tab: form on the left, how delivery works on the right. */
export function ComposeBroadcast() {
  const composer = useBroadcastComposer()
  return (
    <SplitLayout
      main={<Card><AudienceFields composer={composer} /><ChannelPicker composer={composer} /><MessageField composer={composer} /><SendBroadcast composer={composer} /></Card>}
      side={<DeliveryNote />}
    />
  )
}

function DeliveryNote() {
  return (
    <Banner tone="info" title="How it's delivered">
      Only verified groups get broadcasts. Everyone also gets an in-app notification. Each SMS costs money, and long messages use more than one SMS page.
    </Banner>
  )
}
