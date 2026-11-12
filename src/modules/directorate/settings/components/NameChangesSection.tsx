import { PencilLine } from 'lucide-react'

import { Banner, Button, Card, EmptyState, Skeleton, SkeletonRegion } from '@/components/shared'
import { countLabel, formatDay } from '@/lib/format'
import { useNameChanges } from '../hooks/use-settings'
import type { NameChange } from '../types'

/** Leaders asking to rename a verified group. */
export function NameChangesSection() {
  const { items, isLoading, decide } = useNameChanges()
  if (isLoading) return <NameChangesSkeleton />
  if (!items.length) return <EmptyState icon={PencilLine} title="No name changes" />
  return (
    <div className="grid-2">
      {items.map((change) => (
        <NameChangeCard key={change.groupId} change={change} busy={decide.isPending} onDecide={(approve) => decide.mutate({ groupId: change.groupId, approve })} />
      ))}
    </div>
  )
}

function NameChangeCard({ change, onDecide, busy }: { change: NameChange; onDecide: (approve: boolean) => void; busy: boolean }) {
  return (
    <Card>
      <div className="row-between"><span className="small faint">{[change.leaderName, change.state].filter(Boolean).join(' · ')}</span><span className="small faint">{formatDay(change.requestedAt)}</span></div>
      <p className="mt-2"><span className="faint">{change.name}</span> → <b>{change.pendingName}</b></p>
      {change.sameNameGroups > 0 && (
        <Banner tone="warn" className="mt-3" title={`${countLabel(change.sameNameGroups, 'other group is', 'other groups are')} already called this`} />
      )}
      <div className="grid-2 mt-4 !grid-cols-2">
        <Button variant="primary" disabled={busy} onClick={() => onDecide(true)}>Approve</Button>
        <Button disabled={busy} onClick={() => onDecide(false)}>Decline</Button>
      </div>
    </Card>
  )
}

/** Name change cards: who and when, old → new, two buttons. */
function NameChangesSkeleton() {
  return (
    <SkeletonRegion label="Loading name changes" className="grid-2">
      {[0, 1].map((i) => (
        <div key={i} className="card skel-stack" style={{ gap: 10 }}>
          <span className="row-between"><Skeleton w="40%" h={10} /><Skeleton w={70} h={10} /></span>
          <Skeleton w="70%" h={14} className="mt-1" />
          <span className="grid-2 mt-2 !grid-cols-2"><Skeleton h={44} shape="box" /><Skeleton h={44} shape="box" /></span>
        </div>
      ))}
    </SkeletonRegion>
  )
}
