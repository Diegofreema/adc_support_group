import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Two equal columns on desktop (home screens); one column on phones.
 * `stagger`: cards arrive one after another (follow through), not all at once.
 */
export function TwoColumn({ left, right, stagger }: { left: ReactNode; right: ReactNode; stagger?: boolean }) {
  return (
    <div className={cn('home-grid', stagger && 'stagger')}>
      <div className="min-w-0">{left}</div>
      <div className="min-w-0 [&>.section-title:first-child]:lg:mt-0">{right}</div>
    </div>
  )
}
