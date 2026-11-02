import type { ReactNode } from 'react'

interface HeroCardProps {
  eyebrow: string
  /** Optional line under the eyebrow (e.g. group name with a switch button). */
  heading?: ReactNode
  value: ReactNode
  caption: ReactNode
  badge?: ReactNode
  action: ReactNode
}

/** Squared-paper card with one big number and the screen's main action. */
export function HeroCard({ eyebrow, heading, value, caption, badge, action }: HeroCardProps) {
  return (
    <section className="hero-card">
      <span className="eyebrow">{eyebrow}</span>
      {heading}
      <div className="row-between mt-5 !items-end">
        <div>
          <div className="hero-num">{value}</div>
          <div className="small hero-muted">{caption}</div>
        </div>
        {badge}
      </div>
      <div className="mt-6">{action}</div>
    </section>
  )
}
