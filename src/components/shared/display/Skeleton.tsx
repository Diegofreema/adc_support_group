import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Size = number | string

interface SkeletonProps {
  w?: Size
  h?: Size
  className?: string
  /** 'line' (text), 'box' (avatar, tile, input) or 'round' (dot, pill). */
  shape?: 'line' | 'box' | 'round'
}

const px = (size: Size | undefined) => (typeof size === 'number' ? `${size}px` : size)

/** One grey placeholder shape that shimmers (still when the phone asks for less motion). */
export function Skeleton({ w = '100%', h = 12, className, shape = 'line' }: SkeletonProps) {
  const style: CSSProperties = { width: px(w), height: px(h) }
  return <span aria-hidden className={cn('skel', shape === 'box' && 'skel-box', shape === 'round' && 'skel-round', className)} style={style} />
}

/** Announces "Loading" to screen readers once, around any skeleton layout. */
export function SkeletonRegion({ label = 'Loading', children, className }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}

/** The page title row (hidden on phones, like the real one). */
export function SkeletonPageHead({ action = false }: { action?: boolean }) {
  return (
    <div className="skel-desktop mb-5 flex items-end justify-between gap-4">
      <div className="skel-stack w-full max-w-[280px]">
        <Skeleton w={28} h={3} />
        <Skeleton w="70%" h={30} />
      </div>
      {action && <Skeleton w={110} h={40} shape="box" />}
    </div>
  )
}

/** A strip of stat tiles, like `.stats`. */
export function SkeletonStats({ count = 4 }: { count?: number }) {
  return (
    <div className="stats">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="stat skel-stack">
          <Skeleton w="55%" h={10} />
          <Skeleton w="40%" h={26} />
          <Skeleton w="65%" h={10} />
        </div>
      ))}
    </div>
  )
}

/** A tab bar, like `.tabs`. */
export function SkeletonTabs({ count = 3 }: { count?: number }) {
  return (
    <div className="tabs" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="tab"><Skeleton w={i === 0 ? 72 : 60} h={12} /></span>
      ))}
    </div>
  )
}

/** Ruled rows in a card: avatar or icon tile, two lines, an optional value on the right. */
export function SkeletonList({ rows = 5, leading = true, trailing = true }: { rows?: number; leading?: boolean; trailing?: boolean }) {
  return (
    <div className="card card-flush">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skel-row">
          {leading && <Skeleton w={40} h={40} shape="box" />}
          <span className="grow">
            <Skeleton w={`${60 - (i % 3) * 12}%`} h={13} />
            <Skeleton w={`${38 + (i % 2) * 14}%`} h={10} />
          </span>
          {trailing && <Skeleton w={48} h={13} />}
        </div>
      ))}
    </div>
  )
}

/** A register table; turns into stacked rows on phones like the real one. */
export function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="card card-flush">
      <div className="skel-table-head"><Skeleton w="30%" h={9} /></div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skel-table-row">
          <span className="flex items-center gap-3"><Skeleton w={32} h={32} shape="box" /><Skeleton w={`${55 + (i % 3) * 10}%`} h={13} /></span>
          <Skeleton w="60%" h={11} />
          <Skeleton w="45%" h={11} />
          <Skeleton w="35%" h={11} />
        </div>
      ))}
    </div>
  )
}

/** A card with a small heading and a few lines (details, a key-value list). */
export function SkeletonCard({ lines = 4, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('card skel-stack', className)} style={{ gap: 14 }}>
      <Skeleton w={90} h={10} />
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="flex items-center justify-between gap-6">
          <Skeleton w={`${30 + (i % 2) * 10}%`} h={11} />
          <Skeleton w={`${22 + (i % 3) * 8}%`} h={12} />
        </span>
      ))}
    </div>
  )
}

/** Labelled inputs and a full-width button. */
export function SkeletonForm({ fields = 4 }: { fields?: number }) {
  return (
    <div className="card skel-stack" style={{ gap: 18 }}>
      {Array.from({ length: fields }, (_, i) => (
        <span key={i} className="skel-stack">
          <Skeleton w={80} h={9} />
          <Skeleton h={46} shape="box" />
        </span>
      ))}
      <Skeleton h={50} shape="box" className="mt-2" />
    </div>
  )
}
