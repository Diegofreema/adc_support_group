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
    <Field label="Via">
      <Segmented options={CHANNEL_OPTIONS} value={value} onChange={onChange} label="Send via" />
      {value === 'free' ? <p className="faint small mt-2">Free</p> : <SmsCostNote cost={cost} balance={balance} />}
    </Field>
  )
}

function SmsCostNote({ cost, balance }: { cost: SmsCost; balance: number }) {
  if (cost.enough) return <p className="faint small mt-2 num">{formatNumber(cost.points)} points</p>
  return (
    <Banner tone="warn" className="mt-3">
      Needs <b className="num">{formatNumber(cost.points)}</b> points. You have <b className="num">{formatNumber(balance)}</b>.
    </Banner>
  )
}
