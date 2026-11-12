import { Banner } from '@/components/shared'
import { formatNaira } from '@/lib/format'
import type { GivingCheck } from '../types'

interface GivingLimitNoteProps {
  check?: GivingCheck
  /** Recording for another member: speak about them, not "you". */
  forSomeoneElse?: boolean
  className?: string
}

/** Warns when a payment goes past the yearly giving limit. Never blocks paying. */
export function GivingLimitNote({ check, forSomeoneElse = false, className }: GivingLimitNoteProps) {
  if (!check || check.limit === null) return null
  if (!check.wouldExceed) {
    if (check.remaining === null) return null
    return <p className={`faint small ${className ?? ''}`}>{formatNaira(check.remaining)} left this year</p>
  }
  const given = `${forSomeoneElse ? "They've" : "You've"} given ${formatNaira(check.givenThisYear)} this year.`
  const still = forSomeoneElse ? 'You can still record it' : 'You can still pay'
  return (
    <Banner tone="warn" className={className}>
      This goes past the yearly giving limit of {formatNaira(check.limit)}. {given} {still}; the Directorate will be told.
    </Banner>
  )
}
