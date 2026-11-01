import { Phone } from 'lucide-react'

import { Avatar, Card, CardHead } from '@/components/shared'
import type { ReviewGroup } from '../types'

export function LeaderCard({ group }: { group: ReviewGroup }) {
  return (
    <Card className="mt-4">
      <CardHead title="Leader" />
      <div className="row">
        <Avatar name={group.leaderName} size="lg" />
        <div className="grow">
          <div className="bold">{group.leaderName}</div>
          <div className="small faint">{group.leaderPhone}</div>
          {group.leaderPhoneChecked && <span className="chip chip-verified mt-2"><Phone className="i" aria-hidden />Phone checked</span>}
        </div>
      </div>
    </Card>
  )
}
