import { lazy, Suspense } from 'react'

import { Banner, PageHeader, SectionTitle, SkeletonRegion, SkeletonStats, SkeletonTable, StatGrid, type StatItem } from '@/components/shared'
import { useRequiredUser } from '@/stores/session-store'
import { AreaTable } from '../components/AreaTable'
import { StrengthBreadcrumb } from '../components/StrengthBreadcrumb'
import { UnitList } from '../components/UnitList'
import { useStrength } from '../hooks/use-strength'
import type { Strength } from '../types'
import { formatNumber, formatPer1000, formatShare } from '../utils/format'

// three.js loads only when this page opens.
const StrengthMap = lazy(() => import('../map/StrengthMap'))

/** Where the groups are strong or weak, polling unit by polling unit. */
export function StrengthPage() {
  const user = useRequiredUser()
  const { setScope, strength, error, isFetching, points, open } = useStrength()
  return (
    <>
      <PageHeader title="Strength" subtitle="Members by where they vote, against registered voters." />
      {error && !strength && <Banner tone="danger" title="Could not load strength">{error.message}</Banner>}
      {!strength && !error && <SkeletonRegion label="Loading strength"><SkeletonStats count={4} /><div className="mt-6"><SkeletonTable /></div></SkeletonRegion>}
      {strength && (
        <div aria-busy={isFetching}>
          <StrengthBreadcrumb strength={strength} nationwide={!user.stateAdmin} onGo={setScope} />
          <div className="mt-4"><StatGrid stats={stats(strength)} /></div>
          {strength.level !== 'unit' && (
            <div className="mt-6">
              <Suspense fallback={<div className="strength-map" />}>
                <StrengthMap strength={strength} points={points} onOpenState={(state) => setScope({ state })} />
              </Suspense>
            </div>
          )}
          <SectionTitle title={strength.level === 'unit' ? 'Polling units' : 'Breakdown'} />
          <AreaTable level={strength.level} rows={strength.areas} onOpen={open} />
          <div className="grid-2 mt-6">
            <UnitList title="Strongest units" units={strength.strongest} measure="per1000" empty="No unit with members and 50+ voters yet" />
            <UnitList title="Weakest units" units={strength.weakest} measure="voters" empty="No ward with members yet" />
          </div>
        </div>
      )}
    </>
  )
}

function stats(strength: Strength): StatItem[] {
  const { totals, coverage } = strength
  const items: StatItem[] = [
    { label: 'Members', value: formatNumber(totals.members), sub: 'by where they vote' },
    { label: 'Units with members', value: formatNumber(totals.unitsWithMembers), sub: `of ${formatNumber(totals.units)} (${formatShare(totals.unitsWithMembers, totals.units)})` },
    { label: 'Per 1,000 voters', value: formatPer1000(totals.per1000), sub: `${formatNumber(totals.voters)} registered` },
  ]
  if (coverage) items.splice(1, 0, { label: 'Voting area set', value: formatShare(coverage.withUnit, coverage.members), sub: `${formatNumber(coverage.withUnit)} of ${formatNumber(coverage.members)} members` })
  return items
}
