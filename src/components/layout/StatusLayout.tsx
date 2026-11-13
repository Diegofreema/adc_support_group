import type { ReactNode } from 'react'

interface StatusLayoutProps {
  /** Big line on the dark panel (desktop only). */
  headline: ReactNode
  children: ReactNode
}

/**
 * Full-page frame for the 404 and error pages: the sign-in pages' dark panel
 * and form column. No router links, so it also renders when the router itself
 * has failed.
 */
export function StatusLayout({ headline, children }: StatusLayoutProps) {
  return (
    <div className="auth">
      <aside className="auth-visual" aria-hidden>
        <Brand withName />
        <h2>{headline}</h2>
        <div />
      </aside>
      <main className="auth-main">
        <div className="row-between"><span className="hide-desktop"><Brand /></span></div>
        <div className="auth-inner">{children}</div>
      </main>
    </div>
  )
}

function Brand({ withName }: { withName?: boolean }) {
  return (
    <a href="/" className="brand" aria-label="ADC Support Groups home">
      <span className="brand-mark"><b>ADC</b></span>
      {withName && <span className="brand-name">Support Groups</span>}
    </a>
  )
}
