import type { ReactNode } from 'react'

/** Two equal columns on desktop (home screens); one column on phones. */
export function TwoColumn({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="home-grid">
      <div className="min-w-0">{left}</div>
      <div className="min-w-0 [&>.section-title:first-child]:lg:mt-0">{right}</div>
    </div>
  )
}
