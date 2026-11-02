import type { ReactNode } from 'react'

/** Main column + sticky side panel on desktop; stacked on phones. */
export function SplitLayout({ main, side }: { main: ReactNode; side: ReactNode }) {
  return (
    <div className="split">
      <div className="min-w-0">{main}</div>
      <aside className="split-side">{side}</aside>
    </div>
  )
}
