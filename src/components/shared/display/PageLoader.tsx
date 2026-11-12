import type { ReactNode } from 'react'

import {
  Skeleton, SkeletonCard, SkeletonForm, SkeletonList, SkeletonPageHead, SkeletonRegion, SkeletonStats,
  SkeletonTable, SkeletonTabs,
} from './Skeleton'

/**
 * The shape a page takes while it loads:
 *   list       tabs + ruled rows (activities, events, notifications)
 *   dashboard  stat tiles + a list and a side card (home, overview, money)
 *   detail     a header block + cards (an activity, an event, a group)
 *   table      tabs + filters + a register table (members, staff lists)
 *   form       labelled inputs + a button (edit, record)
 */
export type PageShape = 'list' | 'dashboard' | 'detail' | 'table' | 'form'

export function PageLoader({ shape = 'list', label = 'Loading' }: { shape?: PageShape; label?: string }) {
  return (
    <SkeletonRegion label={label}>
      {SHAPES[shape]()}
    </SkeletonRegion>
  )
}

const SHAPES: Record<PageShape, () => ReactNode> = {
  list: () => (
    <>
      <SkeletonPageHead action />
      <SkeletonTabs />
      <div className="mt-4"><SkeletonList /></div>
    </>
  ),
  dashboard: () => (
    <>
      <SkeletonPageHead />
      <SkeletonStats />
      <div className="grid-2 mt-6 items-start">
        <SkeletonList rows={4} />
        <SkeletonCard lines={3} />
      </div>
    </>
  ),
  detail: () => (
    <>
      <div className="mb-5 flex items-center gap-3">
        <Skeleton w={52} h={52} shape="box" />
        <span className="skel-stack w-full max-w-[260px]">
          <Skeleton w="80%" h={18} />
          <Skeleton w="45%" h={11} />
        </span>
      </div>
      <div className="grid-2 items-start">
        <SkeletonCard lines={5} />
        <SkeletonCard lines={3} />
      </div>
      <div className="mt-4"><SkeletonList rows={3} /></div>
    </>
  ),
  table: () => (
    <>
      <SkeletonPageHead action />
      <SkeletonTabs count={4} />
      <div className="mt-4"><Skeleton h={46} shape="box" /></div>
      <div className="mt-4"><SkeletonTable /></div>
    </>
  ),
  form: () => (
    <div className="main-narrow mx-auto">
      <SkeletonForm />
    </div>
  ),
}
