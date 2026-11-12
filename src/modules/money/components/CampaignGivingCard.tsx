import { HandHeart } from 'lucide-react'

import { Card, IconTile } from '@/components/shared'
import { formatNaira } from '@/lib/format'

/** Campaign giving goes to the cause, so it is shown apart from the group's money. */
export function CampaignGivingCard({ amount }: { amount: number }) {
  return (
    <Card className="mt-4 row gap-3">
      <IconTile icon={HandHeart} tone="blue" />
      <div className="grow">
        <div className="small muted">Given to the campaign</div>
        <div className="h3 num">{formatNaira(amount)}</div>
        <p className="small faint">Not part of the group money above.</p>
      </div>
    </Card>
  )
}
