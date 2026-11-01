import { Coins } from 'lucide-react'

import { Button, Card } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { POINTS_PER_SMS_PAGE } from '../utils/sms-cost'

export function PointsBalanceCard({ balance, onBuy }: { balance: number; onBuy: () => void }) {
  return (
    <Card>
      <div className="row-between">
        <span className="stat-label"><Coins className="i" aria-hidden />SMS points</span>
        <Button size="sm" onClick={onBuy}>Buy</Button>
      </div>
      <div className="stat-value">{formatNumber(balance)}</div>
      <p className="faint small mt-1">{POINTS_PER_SMS_PAGE} points per SMS · ₦1 = 1 point</p>
    </Card>
  )
}
