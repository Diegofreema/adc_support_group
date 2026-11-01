import { MessageSquare, Plus } from 'lucide-react'

import { Button, Card, Stat } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { POINTS_PER_SMS_PAGE } from '../utils/sms-cost'

export function PointsCard({ balance, onBuy }: { balance: number; onBuy: () => void }) {
  return (
    <Card>
      <Stat label="SMS points" icon={MessageSquare} value={formatNumber(balance)} sub={`${POINTS_PER_SMS_PAGE} points per SMS · ₦1 = 1 point`} />
      <Button size="sm" block icon={Plus} className="mt-4" onClick={onBuy}>Buy points</Button>
    </Card>
  )
}
