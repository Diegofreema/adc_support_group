import { ArrowRightLeft } from 'lucide-react'

import { Button, Card, EmptyState, Skeleton, SkeletonRegion } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { useHandovers } from '../hooks/use-settings'
import type { Handover } from '../types'

/** Leaders asking to hand their group to someone else. */
export function HandoversSection() {
  const { items, isLoading, decide } = useHandovers()
  if (isLoading) return <HandoversSkeleton />
  if (!items.length) return <EmptyState icon={ArrowRightLeft} title="No handovers" />
  return (
    <div className="grid-2">
      {items.map((handover) => <HandoverCard key={handover.id} handover={handover} onDecide={(approve) => decide.mutate({ id: handover.id, approve })} busy={decide.isPending} />)}
    </div>
  )
}

function HandoverCard({ handover, onDecide, busy }: { handover: Handover; onDecide: (approve: boolean) => void; busy: boolean }) {
  return (
    <Card>
      <div className="row-between"><h3 className="h3">{handover.groupName}</h3><span className="small faint">{formatDay(handover.requestedAt)}</span></div>
      <p className="mt-2"><span className="faint">{handover.fromName}</span> → <b>{handover.toName}</b></p>
      {handover.reason && <p className="small faint mt-1">{handover.reason}</p>}
      <div className="grid-2 mt-4 !grid-cols-2">
        <Button variant="primary" disabled={busy} onClick={() => onDecide(true)}>Approve</Button>
        <Button disabled={busy} onClick={() => onDecide(false)}>Decline</Button>
      </div>
    </Card>
  )
}

/** Handover cards: group and date, from → to, two buttons. */
function HandoversSkeleton() {
  return (
    <SkeletonRegion label="Loading handovers" className="grid-2">
      {[0, 1].map((i) => (
        <div key={i} className="card skel-stack" style={{ gap: 10 }}>
          <span className="row-between"><Skeleton w="50%" h={16} /><Skeleton w={70} h={10} /></span>
          <Skeleton w="60%" h={12} className="mt-1" />
          <Skeleton w="40%" h={10} />
          <span className="grid-2 mt-2 !grid-cols-2"><Skeleton h={44} shape="box" /><Skeleton h={44} shape="box" /></span>
        </div>
      ))}
    </SkeletonRegion>
  )
}
