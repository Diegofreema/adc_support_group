import { Tag } from '@/components/shared'
import type { MemberRecord } from '../types'
import { canHoldPowers, POWER_LABELS, sortedPowers } from '../utils/powers'

/** Small tags naming what an executive or coordinator may do. */
export function PowerTags({ member }: { member: MemberRecord }) {
  if (!canHoldPowers(member)) return null
  const powers = sortedPowers(member.powers)
  if (powers.length === 0) return <span className="muted small block mt-1">No powers yet</span>
  return (
    <span className="flex flex-wrap gap-1 mt-1">
      {powers.map((power) => <Tag key={power}>{POWER_LABELS[power]}</Tag>)}
    </span>
  )
}
