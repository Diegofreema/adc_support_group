import { Banner, Field, Segmented } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { CHANNEL_OPTIONS } from '../utils/channels'
import type { Channel, SmsCost } from '../types'

interface ChannelPickerProps {
  value: Channel
  onChange: (channel: Channel) => void
  cost: SmsCost
  balance: number
}

export function ChannelPicker({ value, onChange, cost, balance }: ChannelPickerProps) {
  return (
    <Field label="How should it reach them?">
      <Segmented options={CHANNEL_OPTIONS} value={value} onChange={onChange} label="Send via" />
      {value === 'free' ? <p className="muted small mt-2">They see it in the app and by email. It costs nothing.</p> : <SmsCostNote cost={cost} balance={balance} />}
    </Field>
  )
}

function SmsCostNote({ cost, balance }: { cost: SmsCost; balance: number }) {
  if (cost.enough) return <p className="muted small mt-2 num">This uses {formatNumber(cost.points)} of your {formatNumber(balance)} points.</p>
  return (
    <Banner tone="warn" className="mt-3">
      Needs <b className="num">{formatNumber(cost.points)}</b> points. You have <b className="num">{formatNumber(balance)}</b>.
    </Banner>
  )
}
