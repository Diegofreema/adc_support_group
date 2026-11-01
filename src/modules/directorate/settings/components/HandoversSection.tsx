import { ArrowRightLeft } from 'lucide-react'

import { Button, Card, EmptyState } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { useHandovers } from '../hooks/use-settings'
import type { Handover } from '../types'

/** Leaders asking to hand their group to someone else. */
export function HandoversSection() {
  const { items, decide } = useHandovers()
  if (!items.length) return <EmptyState icon={ArrowRightLeft} title="No handovers" />
  return (
    <div className="grid-2">
      {items.map((handover) => <HandoverCard key={handover.id} handover={handover} onDecide={(approve) => decide.mutate({ id: handover.id, approve })} />)}
    </div>
  )
}

function HandoverCard({ handover, onDecide }: { handover: Handover; onDecide: (approve: boolean) => void }) {
  return (
    <Card>
      <div className="row-between"><h3 className="h3">{handover.groupName}</h3><span className="small faint">{formatDay(handover.requestedAt)}</span></div>
      <p className="mt-2"><span className="faint">{handover.fromName}</span> → <b>{handover.toName}</b></p>
      <div className="grid-2 mt-4 !grid-cols-2">
        <Button variant="primary" onClick={() => onDecide(true)}>Approve</Button>
        <Button onClick={() => onDecide(false)}>Decline</Button>
      </div>
    </Card>
  )
}
