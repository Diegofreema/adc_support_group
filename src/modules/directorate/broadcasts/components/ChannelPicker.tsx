import { Field } from '@/components/shared'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'
import { ChannelOption } from './ChannelOption'

/** App + email, or app + SMS. Both are free for the Directorate. */
export function ChannelPicker({ composer }: { composer: BroadcastComposer }) {
  const { draft, update } = composer
  return (
    <Field label="Send by" className="mt-4">
      <div className="choices">
        <ChannelOption name="b-channel" label="App + email" note="Free" checked={draft.channel === 'free'} onSelect={() => update('channel')('free')} />
        <ChannelOption name="b-channel" label="App + SMS" note="Free" checked={draft.channel === 'sms'} onSelect={() => update('channel')('sms')} />
      </div>
    </Field>
  )
}
