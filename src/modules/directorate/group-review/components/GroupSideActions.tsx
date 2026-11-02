import type { ReviewGroup } from '../types'
import { DecidedCard } from './DecidedCard'
import { DecisionCard } from './DecisionCard'

/** Right column: decide while waiting, otherwise show the outcome. */
export function GroupSideActions({ group }: { group: ReviewGroup }) {
  return group.status === 'pending' ? <DecisionCard groupId={group.id} /> : <DecidedCard group={group} />
}
