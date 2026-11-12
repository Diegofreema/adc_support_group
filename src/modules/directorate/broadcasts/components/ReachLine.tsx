import { UsersRound } from 'lucide-react'

import { formatNumber } from '@/lib/format'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'
import { missingContact } from '../utils/reach'

/** "Reaches 1,240 people · 312 have no email", live under the audience fields. */
export function ReachLine({ composer }: { composer: BroadcastComposer }) {
  const { reach, draft } = composer
  return (
    <p className="row small mt-3 !gap-2" aria-live="polite">
      <UsersRound className="i i-sm shrink-0 faint" aria-hidden />
      <span>{reachText(reach, draft.channel)}</span>
    </p>
  )
}

function reachText(reach: BroadcastComposer['reach'], channel: BroadcastComposer['draft']['channel']): string {
  if (reach.failed) return "Couldn't count who this reaches"
  if (!reach.count) return 'Counting…'
  if (reach.empty) return 'Reaches no one. Change the filters to find people'
  const people = `Reaches ${formatNumber(reach.count.total)} ${reach.count.total === 1 ? 'person' : 'people'}`
  const missing = missingContact(reach.count, channel)
  return [reach.counting ? `${people}…` : people, missing].filter(Boolean).join(' · ')
}
