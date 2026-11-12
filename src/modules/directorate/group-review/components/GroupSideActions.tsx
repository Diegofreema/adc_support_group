import type { ReviewGroup } from '../types'
import { DecidedCard } from './DecidedCard'
import { DecisionCard } from './DecisionCard'
import { RestoreButton } from './RestoreButton'
import { SuspendSection } from './SuspendSection'

/** Decide while waiting; otherwise the outcome, with what can still be done about it. */
export function GroupSideActions({ group }: { group: ReviewGroup }) {
  if (group.status === 'pending') return <DecisionCard groupId={group.id} />
  return (
    <>
      <DecidedCard group={group} action={group.status === 'suspended' ? <RestoreButton groupId={group.id} block /> : undefined} />
      {group.status === 'verified' && <SuspendSection groupId={group.id} />}
    </>
  )
}
