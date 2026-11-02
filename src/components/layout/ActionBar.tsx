import type { ReactNode } from 'react'

/** Sticky bottom area for a screen's main action on phones; static on desktop. */
export function ActionBar({ children }: { children: ReactNode }) {
  return <div className="action-bar">{children}</div>
}
