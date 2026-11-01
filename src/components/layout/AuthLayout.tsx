import type { ReactNode } from 'react'

import { BrandMark } from './BrandMark'

interface AuthLayoutProps {
  /** Big headline on the dark side panel (desktop only). */
  headline: ReactNode
  /** Optional content at the bottom of the side panel. */
  visualFooter?: ReactNode
  /** Small link in the top-right of the form side (e.g. "Log in"). */
  topAction?: ReactNode
  children: ReactNode
}

/** Public pages: dark ruled panel on desktop + form column. */
export function AuthLayout({ headline, visualFooter, topAction, children }: AuthLayoutProps) {
  return (
    <div className="auth">
      <aside className="auth-visual" aria-hidden>
        <BrandMark withName />
        <h2>{headline}</h2>
        <div>{visualFooter}</div>
      </aside>
      <main className="auth-main">
        <div className="row-between">
          <span className="hide-desktop"><BrandMark /></span>
          <span className="ml-auto">{topAction}</span>
        </div>
        <div className="auth-inner">{children}</div>
      </main>
    </div>
  )
}
