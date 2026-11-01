import type { ReactNode } from 'react'

/**
 * Public pages have a white panel and no bottom tab bar, so the sticky
 * action bar fades to white and drops the tab-bar padding.
 */
const FRAME_CLASS = '[&_.action-bar]:pb-4 [&_.action-bar]:[background:linear-gradient(to_top,var(--surface)_75%,transparent)]'

export function AuthFormFrame({ children }: { children: ReactNode }) {
  return <div className={FRAME_CLASS}>{children}</div>
}
