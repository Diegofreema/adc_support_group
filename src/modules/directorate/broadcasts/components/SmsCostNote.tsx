import { Banner } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'

/** Only shown when SMS is on: what it costs and whether points cover it. */
export function SmsCostNote({ composer }: { composer: BroadcastComposer }) {
  if (!composer.draft.channels.sms || !composer.cost) return null
  return (
    <Banner tone={composer.enoughPoints ? 'info' : 'warn'} className="mt-4">
      Uses <b className="num">{formatNumber(composer.cost)}</b> points. You have <b className="num">{formatNumber(composer.balance)}</b>.
    </Banner>
  )
}
