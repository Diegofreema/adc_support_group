import { Field } from '@/components/shared'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'
import { ChannelOption } from './ChannelOption'

export function ChannelPicker({ composer }: { composer: BroadcastComposer }) {
  const { channels } = composer.draft
  const setChannel = (key: keyof typeof channels) => (checked: boolean) => composer.update('channels')({ ...channels, [key]: checked })
  return (
    <Field label="Send by" className="mt-4">
      <div className="choices">
        <ChannelOption label="App + email" note="Free" checked={channels.app} onChange={setChannel('app')} />
        <ChannelOption label="SMS" note="Points" checked={channels.sms} onChange={setChannel('sms')} />
      </div>
    </Field>
  )
}
